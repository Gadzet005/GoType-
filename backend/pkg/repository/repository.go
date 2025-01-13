package repository

import (
	gotype "github.com/Gadzet005/GoType/backend"
	"github.com/go-redis/redis"
	"github.com/jmoiron/sqlx"
	"time"
)

type Authorization interface {
	CreateUser(user gotype.User) (int, int, string, error)
	GetUser(username, password string) (gotype.User, error)
	SetUserRefreshToken(id int, refreshToken string, expiresAt time.Time) (int, int, string, error)
	GetUserById(id int) (gotype.User, error)
	DropRefreshToken(id int, newTime time.Time) (int, error)
}

type Repository struct {
	Authorization Authorization
}

func NewRepository(db *sqlx.DB, client *redis.Client) *Repository {
	return &Repository{
		Authorization: NewAuthPostgres(db, client),
	}
}
