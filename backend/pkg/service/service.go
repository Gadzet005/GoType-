package service

import (
	gotype "github.com/Gadzet005/GoType/backend"
	"github.com/Gadzet005/GoType/backend/pkg/repository"
	"time"
)

type Authorization interface {
	CreateUser(user gotype.User) (string, string, error)
	GenerateToken(username, password string) (string, string, error)
	GenerateTokenByToken(accessToken, refreshToken string) (string, string, error)
	Parse(accessToken string) (time.Time, int, int, error)
	DropRefreshToken(id int) error
}

type Service struct {
	Authorization Authorization
}

func NewService(repos *repository.Repository) *Service {
	return &Service{
		Authorization: NewAuthService(repos.Authorization),
	}
}
