package service

import (
	"github.com/Gadzet005/GoType/backend/pkg/repository"
	"time"
)

type UserActionsService struct {
	repo repository.UserActions
}

func NewUserActionsService(repo repository.UserActions) *UserActionsService {
	return &UserActionsService{repo: repo}
}

func (s *UserActionsService) DropRefreshToken(id int) error {
	_, err := s.repo.DropRefreshToken(id, time.Now())

	if err != nil {
		return err
	}

	return nil
}

func (s *UserActionsService) GetUserById(id int) (string, int, time.Time, string, error) {
	name, access, banTime, banReason, err := s.repo.GetUserById(id)

	if err != nil {
		return "", -1, time.Now(), "", err
	} //no such user

	return name, access, banTime, banReason, nil
}
