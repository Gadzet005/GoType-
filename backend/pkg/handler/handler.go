package handler

import (
	_ "github.com/Gadzet005/GoType/backend/docs"
	"github.com/Gadzet005/GoType/backend/pkg/service"
	"github.com/gin-contrib/cors"
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

	router.Use(cors.Default())

	auth := router.Group("/auth")
	{
		auth.POST("/register", h.register)
		auth.POST("/login", h.login)
		auth.POST("/refresh", h.refresh)
	}

	userActions := router.Group("/user-actions", h.UserIdentity)
	{
		userActions.POST("/logout", h.logout)
		userActions.GET("/get-user-info", h.getUserInfo)
	}

	//stats := router.Group("/stats", h.UserIdentity)
	//{
	//
	//}

	//admin := router.Group("/admin", h.UserIdentity)
	//{
	//
	//}

	//level := router.Group("/level")
	//{
	//
	//}

	//multGame := router.Group("/mult-game")
	//{
	//
	//}

	//singleGame := router.Group("/single-game")
	//{
	//
	//}

	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	//router.Run(":8080")

	return router
}
