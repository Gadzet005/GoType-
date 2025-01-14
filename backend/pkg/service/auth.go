package service

import (
	"crypto/sha1"
	"errors"
	"fmt"
	gotype "github.com/Gadzet005/GoType/backend"
	"github.com/Gadzet005/GoType/backend/pkg/repository"
	"github.com/golang-jwt/jwt/v5"
	"math/rand"
	"time"
)

// TODO: Move to .env
const (
	salt            = "pqlpwisd5786vhdf27675da"
	signingKey      = "wiu8s7]df9s&di9230s#s894w90g2092v[d"
	refreshTokenTTL = time.Hour * 720  //1 month
	accessTokenTTL  = time.Minute * 15 //15 min
	letterRunes     = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#&!?&"
)

type AuthService struct {
	repo repository.Authorization
}

type tokenClaims struct {
	jwt.RegisteredClaims `json:"Claims"`
	Id                   int `json:"id"`
	Access               int `json:"access"`
}

func NewAuthService(repo repository.Authorization) *AuthService {
	return &AuthService{repo: repo}
}

func (s *AuthService) CreateUser(user gotype.User) (string, string, error) {
	user.Password = s.generatePasswordHash(user.Password)

	rToken, err := s.NewRefreshToken()

	if err != nil {
		return "", "", errors.New(gotype.ErrInternal)
	}

	user.RefreshToken = rToken
	user.ExpiresAt = time.Now().UTC().Add(refreshTokenTTL)

	id, access, refreshToken, err := s.repo.CreateUser(user)

	if err != nil {
		return "", "", err
	}

	accessToken, err := s.NewAccessToken(id, access)

	if err != nil {
		return "", "", errors.New(gotype.ErrInternal)
	}

	return accessToken, refreshToken, nil
}

// refreshToken, accessToken, error
func (s *AuthService) GenerateToken(username, password string) (string, string, error) {
	user, err := s.repo.GetUser(username, s.generatePasswordHash(password))

	if err != nil {
		return "", "", err
	}

	refreshToken, err := s.NewRefreshToken()

	if err != nil {
		return "", "", errors.New(gotype.ErrInternal)
	}
	expiresAt := time.Now().UTC().Add(refreshTokenTTL)

	id, access, refreshToken, err := s.repo.SetUserRefreshToken(int(user.Id), refreshToken, expiresAt)

	if err != nil {
		return "", "", err
	}

	accessToken, err := s.NewAccessToken(id, access)

	if err != nil {
		return "", "", errors.New(gotype.ErrInternal)
	}

	return refreshToken, accessToken, nil
}

func (s *AuthService) GenerateTokenByToken(accessToken, refreshToken string) (string, string, error) {
	_, id, _, err := s.Parse(accessToken)

	if err != nil {
		return "", "", errors.New(gotype.ErrAccessToken)
	}

	user, err := s.repo.GetUserById(id)

	if err != nil {
		return "", "", err
	}

	if user.RefreshToken != refreshToken {
		return "", "", errors.New(gotype.ErrRefreshToken)
	}

	if user.ExpiresAt.Before(time.Now()) {
		return "", "", errors.New(gotype.ErrUnauthorized)
	}

	newRefreshToken, err := s.NewRefreshToken()

	if err != nil {
		return "", "", errors.New(gotype.ErrInternal)
	}
	expiresAt := time.Now().UTC().Add(refreshTokenTTL)

	retId, retAccess, newRefreshToken, err := s.repo.SetUserRefreshToken(int(user.Id), newRefreshToken, expiresAt)

	if err != nil {
		return "", "", err
	}

	newAccessToken, err := s.NewAccessToken(retId, retAccess)

	if err != nil {
		return "", "", errors.New(gotype.ErrInternal)
	}

	return newRefreshToken, newAccessToken, nil
}

func (s *AuthService) NewAccessToken(id, Access int) (string, error) {
	authToken := jwt.NewWithClaims(jwt.SigningMethodHS256, tokenClaims{
		jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(accessTokenTTL)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
		id,
		Access,
	})

	//timet, _ := authToken.Claims.GetExpirationTime()
	//fmt.Printf("Exp time: %s \n", timet)
	//timet1, _ := authToken.Claims.GetIssuedAt()
	//fmt.Printf("Iss time: %s \n", timet1)
	//ans, _ := authToken.SignedString([]byte(signingKey))
	//fmt.Printf("TokenString: %s \n", ans)

	return authToken.SignedString([]byte(signingKey))
}

func (s *AuthService) NewRefreshToken() (string, error) {

	b := make([]rune, 32)
	for i := range b {
		b[i] = []rune(letterRunes)[rand.Intn(len(letterRunes))]
	}
	return string(b), nil

	//b := make([]byte, 32)
	//temp := rand.NewSource(time.Now().Unix())
	//r := rand.New(temp)
	//
	//_, err := r.Read(b)
	//
	//if err != nil {
	//	return "", err
	//}

	//return fmt.Sprintf("%s", strings.ToValidUTF8(string(b), "")), nil
}

//func (s *AuthService) Parse(accessToken string) (time.Time, int, int, error) {
//	fmt.Printf("Token: %s \n", accessToken)
//
//	token, err := jwt.ParseWithClaims(accessToken, &tokenClaims{}, func(token *jwt.Token) (interface{}, error) {
//		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
//			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
//		}
//
//		return []byte(signingKey), nil
//	})
//
//	fmt.Print(err.Error())
//
//	if err != nil {
//		return time.Time{}, -1, -1, err
//	}
//
//	claims, ok := token.Claims.(*tokenClaims)
//	if !ok || !token.Valid {
//		return time.Time{}, -1, -1, errors.New("invalid token")
//	}
//
//	expirationTime := claims.ExpiresAt.Time
//	userId := claims.Id
//	accessLevel := claims.Access
//
//	return expirationTime, userId, accessLevel, nil
//}

func (s *AuthService) Parse(accessToken string) (time.Time, int, int, error) {
	//fmt.Printf("Token: %s \n", accessToken)

	token, err := jwt.ParseWithClaims(accessToken, new(tokenClaims), func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(signingKey), nil
	})

	if err != nil {
		//fmt.Print(err.Error())
		return time.Time{}, -1, -1, fmt.Errorf("failed to parse token: %w", err)
	}

	claims, ok := token.Claims.(*tokenClaims)
	if !ok || !token.Valid {
		return time.Time{}, -1, -1, errors.New("invalid token")
	}

	expirationTime, err := claims.GetExpirationTime()

	if err != nil {
		return time.Time{}, -1, -1, err
	}

	userId := claims.Id
	accessLevel := claims.Access

	return expirationTime.Time, userId, accessLevel, nil
}

func (s *AuthService) generatePasswordHash(password string) string {
	hash := sha1.New()
	hash.Write([]byte(password))

	return fmt.Sprintf("%x", hash.Sum([]byte(salt)))
}
