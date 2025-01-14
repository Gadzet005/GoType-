package repository

import (
	"database/sql"
	"errors"
	"fmt"
	gotype "github.com/Gadzet005/GoType/backend"
	"github.com/jmoiron/sqlx"
	"github.com/redis/go-redis/v9"
	"time"
)

type UserActionsPostgres struct {
	db     *sqlx.DB
	client *redis.Client
}

func NewUserActionsPostgres(db *sqlx.DB, client *redis.Client) *UserActionsPostgres {
	return &UserActionsPostgres{db: db, client: client}
}

func (s *UserActionsPostgres) DropRefreshToken(id int, newTime time.Time) (int, error) {
	var retId int

	query := fmt.Sprintf("UPDATE %s SET expires_at = $1 WHERE id = $2 RETURNING id", usersTable)

	row := s.db.QueryRow(query, newTime, id)
	if err := row.Scan(&retId); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return -1, errors.New(gotype.ErrUserNotFound)
		}

		return -1, errors.New(gotype.ErrInternal)
	}

	return retId, nil
}

func (s *UserActionsPostgres) GetUserById(id int) (string, int, time.Time, string, error) {
	var name, banReason string
	var banTime time.Time
	var access int

	query := fmt.Sprintf("SELECT name, access FROM %s WHERE id = $1", usersTable)

	row := s.db.QueryRow(query, id)

	if err := row.Scan(&name, &access); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return "", -1, banTime, banReason, errors.New(gotype.ErrUserNotFound)
		}

		return "", -1, time.Now(), "", errors.New(gotype.ErrInternal)
	}

	//TODO: delete when migrate
	banReason = ""
	banTime = time.Time{}

	return name, access, banTime, banReason, nil
}
