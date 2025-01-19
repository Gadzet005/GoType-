package service

import (
	"errors"
	gotype "github.com/Gadzet005/GoType/backend"
	"github.com/Gadzet005/GoType/backend/entities"
	"github.com/Gadzet005/GoType/backend/pkg/repository"
	"time"
)

type AdminService struct {
	repo repository.Admin
}

func NewAdminService(repo repository.Admin) *AdminService {
	return &AdminService{repo: repo}
}

func (s *AdminService) TryBanUser(adminAccess int, ban entities.UserBan) error {

	bannedUserAccess, err := s.repo.GetUserAccess(ban.Id)

	if err != nil {
		return err
	}

	if adminAccess <= bannedUserAccess || adminAccess < entities.Moderator {
		return errors.New(gotype.ErrPermissionDenied)
	}

	duration, err := time.ParseDuration(ban.BanTime)

	if err != nil {
		return errors.New(gotype.ErrInvalidInput)
	}

	endTime := time.Now().Add(duration).UTC()

	err = s.repo.BanUser(ban.Id, endTime, ban.BanReason)

	if err != nil {
		return err
	}

	return nil
}

func (s *AdminService) TryUnbanUser(adminAccess int, ban entities.UserUnban) error {
	bannedUserAccess, err := s.repo.GetUserAccess(ban.Id)

	if err != nil {
		return err
	}

	if adminAccess <= bannedUserAccess || adminAccess < entities.Moderator {
		return errors.New(gotype.ErrPermissionDenied)
	}

	err = s.repo.UnbanUser(ban.Id)

	if err != nil {
		return err
	}

	return nil
}

func (s *AdminService) TryBanLevel(adminAccess int, ban entities.LevelBan) error {
	if adminAccess < entities.Moderator {
		return errors.New(gotype.ErrPermissionDenied)
	}

	err := s.repo.BanLevel(ban.Id)

	if err != nil {
		return err
	}

	return nil
}

func (s *AdminService) TryUnbanLevel(adminAccess int, ban entities.LevelBan) error {

	if adminAccess < entities.Moderator {
		return errors.New(gotype.ErrPermissionDenied)
	}

	err := s.repo.UnbanLevel(ban.Id)

	if err != nil {
		return err
	}

	return nil
}

func (s *AdminService) TryChangeAccessLevel(adminAccess int, ban entities.ChangeUserAccess) error {
	bannedUserAccess, err := s.repo.GetUserAccess(ban.Id)

	if err != nil {
		return err
	}

	if bannedUserAccess >= adminAccess || adminAccess < entities.Moderator || ban.NewAccess >= adminAccess {
		return errors.New(gotype.ErrPermissionDenied)
	}

	err = s.repo.ChangeUserAccess(ban.Id, ban.NewAccess)

	if err != nil {
		return err
	}

	return nil
}
