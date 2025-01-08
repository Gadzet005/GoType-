package handler

import (
	_ "github.com/Gadzet005/GoType/backend/docs"
	"github.com/Gadzet005/GoType/backend/pkg/service"
	"github.com/gin-gonic/gin"
	"github.com/swaggo/files"       // swagger embed files
	"github.com/swaggo/gin-swagger" // gin-swagger middleware
)

type Handler struct {
	services *service.Service
}

func NewHandler(services *service.Service) *Handler {
	return &Handler{services: services}
}

func (h *Handler) InitRoutes() *gin.Engine {
	router := gin.New()

	auth := router.Group("/auth")
	{
		auth.POST("/register", h.register)
		auth.POST("/login", h.login)
		auth.POST("/refresh", h.refresh)
		//auth.POST("/logout", h.UserIdentity, h.logout)
	}

	logout := router.Group("/logout", h.UserIdentity)
	{
		logout.POST("/logout", h.logout)
	}

	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	router.Run(":8080")

	return router
}
