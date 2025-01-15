package repository

import (
	"database/sql"
	"errors"
	"fmt"
	gotype "github.com/Gadzet005/GoType/backend"
	"github.com/jmoiron/sqlx"
	"github.com/redis/go-redis/v9"
	"github.com/sirupsen/logrus"
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

	query := fmt.Sprintf("SELECT name, access, ban_expiration, ban_reason FROM %s WHERE id = $1", usersTable)

	row := s.db.QueryRow(query, id)

	if err := row.Scan(&name, &access, &banTime, &banReason); err != nil {
		logrus.Fatalf("Error getting user by id: %s", err.Error())
		if errors.Is(err, sql.ErrNoRows) {
			return "", -1, banTime, banReason, errors.New(gotype.ErrUserNotFound)
		}

		return "", -1, time.Now(), "", errors.New(gotype.ErrInternal)
	}

	return name, access, banTime, banReason, nil
}

func (s *UserActionsPostgres) CreateUserComplaint(complaint gotype.UserComplaint) error {
	var id int

	query := fmt.Sprintf("INSERT INTO %s (user_id, author, time, given_to, reason, message) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id", userComplaintsTable)

	row := s.db.QueryRow(query, complaint.UserId, complaint.AuthorId, complaint.CreationTime, complaint.AssignedTo, complaint.Reason, complaint.Message)

	if err := row.Scan(&id); err != nil {
		return errors.New(gotype.ErrInternal)
	}

	return nil
}

func (s *UserActionsPostgres) CreateLevelComplaint(complaint gotype.LevelComplaint) error {
	var id int

	query := fmt.Sprintf("INSERT INTO %s (level_id, author, time, given_to, reason, message) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id", levelComplaintsTable)

	row := s.db.QueryRow(query, complaint.LevelId, complaint.AuthorId, complaint.CreationTime, complaint.AssignedTo, complaint.Reason, complaint.Message)

	if err := row.Scan(&id); err != nil {
		return errors.New(gotype.ErrInternal)
	}

	return nil
}
