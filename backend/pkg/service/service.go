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
}

type UserActions interface {
	DropRefreshToken(id int) error
	GetUserById(id int) (string, int, time.Time, string, error)
	CreateUserComplaint(complaint gotype.UserComplaint) error
	CreateLevelComplaint(complaint gotype.LevelComplaint) error
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

type Service struct {
	Authorization Authorization
	UserActions   UserActions
}

func NewService(repos *repository.Repository) *Service {
	return &Service{
		Authorization: NewAuthService(repos.Authorization),
		UserActions:   NewUserActionsService(repos.UserActions),
	}
}
