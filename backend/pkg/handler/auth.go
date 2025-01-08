package handler

import (
	gotype "github.com/Gadzet005/GoType/backend"
	"github.com/gin-gonic/gin"
	"net/http"
)

// @Summary Register
// @Tags auth
// @Description create new account
// @ID create-account
// @Accept json
// @Produce json
// @Param input body gotype.User true "new account info"
// @Success 200 {object} handler.refreshStruct
// @Failure 400,404 {object} errorResponse
// @Failure 500 {object} errorResponse
// @Failure default {object} errorResponse
// @Router /auth/register [post]
func (h *Handler) register(c *gin.Context) {
	var input gotype.User

	if err := c.BindJSON(&input); err != nil {
		NewErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	accessToken, refreshToken, err := h.services.Authorization.CreateUser(input)
	if err != nil {
		NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"access_token":  accessToken,
		"refresh_token": refreshToken,
	})
}

// @Summary Login
// @Tags auth
// @Description authorize using login and password
// @ID login
// @Accept json
// @Produce json
// @Param input body gotype.User true "login and password"
// @Success 200 {object} handler.refreshStruct
// @Failure 400,404 {object} errorResponse
// @Failure 500 {object} errorResponse
// @Failure default {object} errorResponse
// @Router /auth/login [post]
func (h *Handler) login(c *gin.Context) {
	var input gotype.User

	if err := c.BindJSON(&input); err != nil {
		NewErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	refreshToken, accessToken, err := h.services.Authorization.GenerateToken(input.Name, input.Password)
	if err != nil {
		NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"access_token":  refreshToken,
		"refresh_token": accessToken,
	})
}

type refreshStruct struct {
	RefreshToken string `json:"refresh_token"`
	AccessToken  string `json:"access_token"`
}

// @Summary Refresh
// @Tags auth
// @Description get new access token and refresh token by existing access token and refresh token
// @ID refresh
// @Accept json
// @Produce json
// @Param input body handler.refreshStruct true "RefreshToken and AccessToken"
// @Success 200 {object} handler.refreshStruct
// @Failure 400,404 {object} errorResponse
// @Failure 500 {object} errorResponse
// @Failure default {object} errorResponse
// @Router /auth/refresh [post]
func (h *Handler) refresh(c *gin.Context) {
	var input refreshStruct

	if err := c.BindJSON(&input); err != nil {
		NewErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	refreshToken, accessToken, err := h.services.Authorization.GenerateTokenByToken(input.AccessToken, input.RefreshToken)
	if err != nil {
		NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"access_token":  refreshToken,
		"refresh_token": accessToken,
	})
}

type logoutStruct struct {
	AccessToken string `json:"access_token"`
}

// @Summary Logout
// @Tags logout
// @Description Expire refreshToken manually
// @ID logout
// @Accept json
// @Produce json
// @Param input body handler.logoutStruct true "AccessToken"
// @Success 200
// @Failure 400,404 {object} errorResponse
// @Failure 500 {object} errorResponse
// @Failure default {object} errorResponse
// @Router /logout/logout [post]
func (h *Handler) logout(c *gin.Context) {
	var input logoutStruct

	if err := c.BindJSON(&input); err != nil {
		NewErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	curId, exists := c.Get("id")

	if !exists {
		NewErrorResponse(c, http.StatusInternalServerError, "id not found")
	}

	err := h.services.Authorization.DropRefreshToken(curId.(int))

	if err != nil {
		NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{})
}
