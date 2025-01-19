package entities

import "time"

type AccessLevel int

const (
	Banned = iota
	Authorized
	Moderator
	Admin
	SeniorAdmin
)

type User struct {
	Id           int         `json:"-" db:"id"`
	Name         string      `json:"name" binding:"required"`
	Password     string      `json:"password" binding:"required" db:"password_hash"` //hash
	RefreshToken string      `json:"-" db:"refresh_token"`
	ExpiresAt    time.Time   `json:"-" db:"expires_at"`
	Access       AccessLevel `json:"-" db:"access"`
}
