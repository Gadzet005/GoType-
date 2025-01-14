package gotype

type Error string

const (
	ErrUserExists   = "ERR_USER_EXISTS"
	ErrUserNotFound = "ERR_NO_SUCH_USER"
	ErrRefreshToken = "ERR_REFRESH_TOKEN_WRONG"
	ErrAccessToken  = "ERR_ACCESS_TOKEN_WRONG"
	ErrInternal     = "ERR_INTERNAL"
	ErrUnauthorized = "ERR_UNAUTHORIZED"
	ErrInvalidInput = "ERR_INVALID_INPUT"
)
