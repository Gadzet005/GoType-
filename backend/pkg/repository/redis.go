package repository

import (
	"fmt"
	"github.com/go-redis/redis"
)

type RedisConfig struct {
	Host     string
	Port     string
	Password string
}

func NewRedisDB(cfg RedisConfig) (*redis.Client, error) {
	client := redis.NewClient(&redis.Options{
		Addr:     fmt.Sprintf("%s:%s", cfg.Host, cfg.Port),
		Password: cfg.Password,
		DB:       0,
	})

	ping, err := client.Ping().Result()
	if err != nil || ping != "PONG" {
		return nil, err
	}

	return client, nil
}
