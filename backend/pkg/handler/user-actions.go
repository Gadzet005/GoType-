package handler

import (
	gotype "github.com/Gadzet005/GoType/backend"
	"github.com/gin-gonic/gin"
	"net/http"
)

//type logoutStruct struct {
//	AccessToken string `json:"access_token"`
//}

// @Summary Logout
// @Tags user-actions
// @Description Expire refreshToken manually
// @ID logout
// @Accept json
// @Produce json
// @Success 200
// @Failure 400 {object} errorResponse "Possible messages: ERR_ACCESS_TOKEN_WRONG - There is no id in token payload/Wrong structure of Access Token/No Access Token; ERR_NO_SUCH_USER - User with such id not found;"
// @Failure 401 {object} errorResponse "Possible messages: ERR_UNAUTHORIZED - Access Token expired"
// @Failure 500 {object} errorResponse "Possible messages: ERR_INTERNAL - Error on server"
// @Failure default {object} errorResponse
// @Router /user-actions/logout [post]
func (h *Handler) logout(c *gin.Context) {
	//var input logoutStruct
	//
	//if err := c.BindJSON(&input); err != nil {
	//	NewErrorResponse(c, http.StatusBadRequest, err.Error())
	//	return
	//}

	curId, exists := c.Get("id")

	if !exists {
		NewErrorResponse(c, http.StatusBadRequest, gotype.ErrAccessToken)
	}

	err := h.services.UserActions.DropRefreshToken(curId.(int))

	if err != nil {
		NewErrorResponse(c, gotype.CodeErrors[err.Error()], err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{})
}

//type getUserInfoStruct struct {
//	id int `json:"id"`
//}

// @Summary Get User Info
// @Tags user-actions
// @Description Get username by id
// @ID get-user-info
// @Accept json
// @Produce json
// @Success 200
// @Failure 400 {object} errorResponse "Possible messages: ERR_ACCESS_TOKEN_WRONG - There is no id in token payload/Wrong structure of Access Token/No Access Token; ERR_NO_SUCH_USER - User with such id not found;"
// @Failure 401 {object} errorResponse "Possible messages: ERR_UNAUTHORIZED - Access Token expired"
// @Failure 500 {object} errorResponse "Possible messages: ERR_INTERNAL - Error on server"
// @Failure default {object} errorResponse
// @Router /user-actions/get-user-info [get]
func (h *Handler) getUserInfo(c *gin.Context) {
	//var input getUserInfoStruct
	//
	//if err := c.BindJSON(&input); err != nil {
	//	NewErrorResponse(c, http.StatusBadRequest, err.Error())
	//	return
	//}

	curId, exists := c.Get("id")

	if !exists {
		NewErrorResponse(c, http.StatusBadRequest, gotype.ErrAccessToken)
	}

	username, access, banTime, banReason, err := h.services.UserActions.GetUserById(curId.(int))

	if err != nil {
		NewErrorResponse(c, gotype.CodeErrors[err.Error()], err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"username":  username,
		"access":    access,
		"banTime":   banTime,
		"banReason": banReason,
	})
}
