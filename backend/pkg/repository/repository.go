package repository

import (
	gotype "github.com/Gadzet005/GoType/backend"
	"github.com/jmoiron/sqlx"
	"github.com/redis/go-redis/v9"
	"time"
)

type Authorization interface {
	CreateUser(user gotype.User) (int, int, string, error)
	GetUser(username, password string) (gotype.User, error)
	SetUserRefreshToken(id int, refreshToken string, expiresAt time.Time) (int, int, string, error)
	GetUserById(id int) (gotype.User, error)
}

type UserActions interface {
	DropRefreshToken(id int, newTime time.Time) (int, error)
	GetUserById(id int) (string, int, time.Time, string, error)
}

type Stats interface {
}

type Admin interface {
}

type MultiplayerGame interface {
}

type SinglePlayerGame interface {
}

type Level interface {
}

type Repository struct {
	Authorization Authorization
	UserActions   UserActions
}

func NewRepository(db *sqlx.DB, client *redis.Client) *Repository {
	return &Repository{
		Authorization: NewAuthPostgres(db, client),
		UserActions:   NewUserActionsPostgres(db, client),
	}
}
