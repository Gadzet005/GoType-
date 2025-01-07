package repository

import (
	"fmt"
	gotype "github.com/Gadzet005/GoType/backend"
	"github.com/jmoiron/sqlx"
	"time"
)

type AuthPostgres struct {
	db *sqlx.DB
}

func NewAuthPostgres(db *sqlx.DB) *AuthPostgres {
	return &AuthPostgres{db: db}
}

func (s *AuthPostgres) CreateUser(user gotype.User) (int, int, string, error) {
	var id int
	var access int
	var rToken string

	query := fmt.Sprintf("INSERT INTO %s (name, password_hash, refresh_token, expires_at) VALUES ($1, $2, $3, $4) RETURNING id, access, refresh_token", usersTable)

	row := s.db.QueryRow(query, user.Name, user.Password, user.RefreshToken, user.ExpiresAt)
	//fmt.Print("HERE: ", user.Name, " ", user.Password, " ", user.RefreshToken, " ", user.ExpiresAt, " ")
	if err := row.Scan(&id, &access, &rToken); err != nil {
		fmt.Printf(err.Error(), '\n')
		return -1, -1, "", err
	}

	return id, access, rToken, nil
}

func (s *AuthPostgres) GetUser(username, password string) (gotype.User, error) {
	var user gotype.User
	query := fmt.Sprintf("SELECT id, access FROM %s WHERE name = $1 AND password_hash = $2", usersTable)

	err := s.db.Get(&user, query, username, password)

	return user, err
}

func (s *AuthPostgres) GetUserById(id int) (gotype.User, error) {
	var user gotype.User
	query := fmt.Sprintf("SELECT id, access, refresh_token, expires_at FROM %s WHERE id = $1", usersTable)

	err := s.db.Get(&user, query, id)

	return user, err
}

func (s *AuthPostgres) DropRefreshToken(id int, newTime time.Time) (int, error) {
	var retId int

	query := fmt.Sprintf("UPDATE %s SET expires_at = $1 WHERE id = $2 RETURNING id", usersTable)

	row := s.db.QueryRow(query, newTime, id)
	if err := row.Scan(&retId); err != nil {
		return -1, err
	}

	return retId, nil
}

func (s *AuthPostgres) SetUserRefreshToken(id int, refreshToken string, expiresAt time.Time) (int, int, string, error) {
	var retId int
	var access int
	var rToken string

	query := fmt.Sprintf("UPDATE %s SET refresh_token = $1, expires_at = $2 WHERE id = $3 RETURNING refresh_token, id, access", usersTable)

	row := s.db.QueryRow(query, refreshToken, expiresAt, id)
	if err := row.Scan(&rToken, &retId, &access); err != nil {
		return -1, -1, "", err
	}

	return retId, access, rToken, nil
}
