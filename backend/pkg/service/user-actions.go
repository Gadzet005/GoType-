package service

import (
	gotype "github.com/Gadzet005/GoType/backend"
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

func (s *UserActionsService) CreateUserComplaint(complaint gotype.UserComplaint) error {
	complaint.CreationTime = time.Now().UTC()

	err := s.repo.CreateUserComplaint(complaint)

	if err != nil {
		return err
	}

	return nil
}

func (s *UserActionsService) CreateLevelComplaint(complaint gotype.LevelComplaint) error {
	complaint.CreationTime = time.Now().UTC()

	err := s.repo.CreateLevelComplaint(complaint)

	if err != nil {
		return err
	}

	return nil
}
