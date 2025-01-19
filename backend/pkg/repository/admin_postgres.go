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

type AdminPostgres struct {
	db     *sqlx.DB
	client *redis.Client
}

func NewAdminPostgres(db *sqlx.DB, client *redis.Client) *AdminPostgres {
	return &AdminPostgres{db: db, client: client}
}

func (s *AdminPostgres) GetUserAccess(id int) (int, error) {
	var retAccess int
	query := fmt.Sprintf("SELECT access FROM %s WHERE id = $1", usersTable)

	row := s.db.QueryRow(query, id)
	if err := row.Scan(&retAccess); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return -1, errors.New(gotype.ErrUserNotFound)
		}

		return -1, errors.New(gotype.ErrInternal)
	}

	return retAccess, nil
}

func (s *AdminPostgres) BanUser(userId int, expirationTime time.Time, reason string) error {
	var retId int
	query := fmt.Sprintf("UPDATE %s SET ban_expiration = $1, ban_reason = $2 WHERE id = $3 RETURNING id", usersTable)

	row := s.db.QueryRow(query, expirationTime, reason, userId)
	if err := row.Scan(&retId); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return errors.New(gotype.ErrUserNotFound)
		}

		return errors.New(gotype.ErrInternal)
	}

	return nil
}

func (s *AdminPostgres) UnbanUser(userId int) error {
	var retId int

	newTime := time.Now().UTC()
	newReason := "no ban"

	query := fmt.Sprintf("UPDATE %s SET ban_expiration = $1, ban_reason = $2 WHERE id = $3 RETURNING id", usersTable)

	row := s.db.QueryRow(query, newTime, newReason, userId)
	if err := row.Scan(&retId); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return errors.New(gotype.ErrUserNotFound)
		}

		return errors.New(gotype.ErrInternal)
	}

	return nil
}

func (s *AdminPostgres) BanLevel(levelId int) error {
	var retId int
	query := fmt.Sprintf("UPDATE %s SET is_banned = $1 WHERE id = $2 RETURNING id", levelTable)

	row := s.db.QueryRow(query, true, levelId)
	if err := row.Scan(&retId); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return errors.New(gotype.ErrEntityNotFound)
		}

		return errors.New(gotype.ErrInternal)
	}

	return nil
}

func (s *AdminPostgres) UnbanLevel(levelId int) error {
	var retId int

	query := fmt.Sprintf("UPDATE %s SET is_banned = $1 WHERE id = $2 RETURNING id", levelTable)

	row := s.db.QueryRow(query, false, levelId)
	if err := row.Scan(&retId); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return errors.New(gotype.ErrEntityNotFound)
		}

		return errors.New(gotype.ErrInternal)
	}

	return nil
}

func (s *AdminPostgres) ChangeUserAccess(userId int, newAccess int) error {
	var retId int
	query := fmt.Sprintf("UPDATE %s SET access = $1 WHERE id = $3 RETURNING id", usersTable)

	row := s.db.QueryRow(query, newAccess, userId)
	if err := row.Scan(&retId); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return errors.New(gotype.ErrUserNotFound)
		}

		return errors.New(gotype.ErrInternal)
	}

	return nil
}
