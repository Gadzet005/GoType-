package repository

import (
	"database/sql"
	"errors"
	"fmt"
	gotype "github.com/Gadzet005/GoType/backend"
	"github.com/jmoiron/sqlx"
	"github.com/redis/go-redis/v9"
	"strings"
	"time"
)

type AuthPostgres struct {
	db     *sqlx.DB
	client *redis.Client
}

func NewAuthPostgres(db *sqlx.DB, client *redis.Client) *AuthPostgres {
	return &AuthPostgres{db: db, client: client}
}

func (s *AuthPostgres) CreateUser(user gotype.User) (int, int, string, error) {
	var id int
	var access int
	var rToken string

	query := fmt.Sprintf("INSERT INTO %s (name, password_hash, refresh_token, expires_at) VALUES ($1, $2, $3, $4) RETURNING id, access, refresh_token", usersTable)

	row := s.db.QueryRow(query, user.Name, user.Password, user.RefreshToken, user.ExpiresAt)

	if err := row.Scan(&id, &access, &rToken); err != nil {
		if strings.HasPrefix(err.Error(), "sql: duplicate key value violates unique constraint") {
			return -1, -1, "", errors.New(gotype.ErrUserExists)
		}

		return -1, -1, "", errors.New(gotype.ErrInternal)
	}

	return id, access, rToken, nil
}

func (s *AuthPostgres) GetUser(username, password string) (gotype.User, error) {
	var user gotype.User
	query := fmt.Sprintf("SELECT id, access FROM %s WHERE name = $1 AND password_hash = $2", usersTable)

	err := s.db.Get(&user, query, username, password)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return gotype.User{}, errors.New(gotype.ErrUserNotFound)
		}

		return gotype.User{}, errors.New(gotype.ErrInternal)
	}

	return user, nil
}

func (s *AuthPostgres) GetUserById(id int) (gotype.User, error) {
	var user gotype.User
	query := fmt.Sprintf("SELECT id, access, refresh_token, expires_at FROM %s WHERE id = $1", usersTable)

	err := s.db.Get(&user, query, id)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return gotype.User{}, errors.New(gotype.ErrUserNotFound)
		}

		return gotype.User{}, errors.New(gotype.ErrInternal)
	}

	return user, nil
}

func (s *AuthPostgres) SetUserRefreshToken(id int, refreshToken string, expiresAt time.Time) (int, int, string, error) {
	var retId int
	var access int
	var rToken string

	query := fmt.Sprintf("UPDATE %s SET refresh_token = $1, expires_at = $2 WHERE id = $3 RETURNING refresh_token, id, access", usersTable)

	row := s.db.QueryRow(query, refreshToken, expiresAt, id)
	if err := row.Scan(&rToken, &retId, &access); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return -1, -1, "", errors.New(gotype.ErrUserNotFound)
		}

		return -1, -1, "", errors.New(gotype.ErrInternal)
	}

	return retId, access, rToken, nil
}
