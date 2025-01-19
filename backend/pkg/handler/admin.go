package handler

import (
	gotype "github.com/Gadzet005/GoType/backend"
	"github.com/Gadzet005/GoType/backend/entities"
	"github.com/gin-gonic/gin"
	"net/http"
)

// @Summary Ban user
// @Tags admin
// @Description Ban user with given id if your access is greater than theirs. Available only for moderators and admins
// @ID ban-user
// @Accept json
// @Produce json
// @Param input body entities.UserBan true "id of user you want to ban, duration of ban (format 10h), ban_reason"
// @Success 200
// @Failure 400 {object} errorResponse "Possible messages: ERR_ACCESS_TOKEN_WRONG - Wrong structure of Access Token/No Access Token; ERR_NO_SUCH_USER - User with such id does not exist; ERR_INVALID_INPUT - Wrong structure of input json/Wrong format of ban duration;"
// @Failure 401 {object} errorResponse "Possible messages: ERR_UNAUTHORIZED - Access Token expired; ERR_PERMISSION_DENIED - Not enough rights to perform the action"
// @Failure 500 {object} errorResponse "Possible messages: ERR_INTERNAL - Error on server"
// @Failure default {object} errorResponse
// @Router /admin/ban-user [post]
func (h *Handler) BanUser(c *gin.Context) {
	var input entities.UserBan
	curAccess, exists := c.Get(userAccessCtx)

	if !exists {
		NewErrorResponse(c, http.StatusBadRequest, gotype.ErrAccessToken)
		return
	}

	if err := c.BindJSON(&input); err != nil {
		NewErrorResponse(c, http.StatusBadRequest, gotype.ErrInvalidInput)
		return
	}

	err := h.services.Admin.TryBanUser(curAccess.(int), input)
	if err != nil {
		NewErrorResponse(c, gotype.CodeErrors[err.Error()], err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{})
}

// @Summary Unban user
// @Tags admin
// @Description Unban user with given id if your access is greater than theirs. Available only for moderators and admins
// @ID unban-user
// @Accept json
// @Produce json
// @Param input body entities.UserUnban true "id of user you want to unban"
// @Success 200
// @Failure 400 {object} errorResponse "Possible messages: ERR_ACCESS_TOKEN_WRONG - Wrong structure of Access Token/No Access Token; ERR_NO_SUCH_USER - User with such id does not exist; ERR_INVALID_INPUT - Wrong structure of input json;"
// @Failure 401 {object} errorResponse "Possible messages: ERR_UNAUTHORIZED - Access Token expired; ERR_PERMISSION_DENIED - Not enough rights to perform the action"
// @Failure 500 {object} errorResponse "Possible messages: ERR_INTERNAL - Error on server"
// @Failure default {object} errorResponse
// @Router /admin/unban-user [post]
func (h *Handler) UnbanUser(c *gin.Context) {
	var input entities.UserUnban
	curAccess, exists := c.Get(userAccessCtx)

	if !exists {
		NewErrorResponse(c, http.StatusBadRequest, gotype.ErrAccessToken)
		return
	}

	if err := c.BindJSON(&input); err != nil {
		NewErrorResponse(c, http.StatusBadRequest, gotype.ErrInvalidInput)
		return
	}

	err := h.services.Admin.TryUnbanUser(curAccess.(int), input)
	if err != nil {
		NewErrorResponse(c, gotype.CodeErrors[err.Error()], err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{})
}

// @Summary Ban level
// @Tags admin
// @Description Ban level with given id. Available only for moderators and admins
// @ID ban-level
// @Accept json
// @Produce json
// @Param input body entities.LevelBan true "id of level you want to ban"
// @Success 200
// @Failure 400 {object} errorResponse "Possible messages: ERR_ACCESS_TOKEN_WRONG - Wrong structure of Access Token/No Access Token; ERR_ENTITY_NOT_FOUND - Level with such id does not exist; ERR_INVALID_INPUT - Wrong structure of input json;"
// @Failure 401 {object} errorResponse "Possible messages: ERR_UNAUTHORIZED - Access Token expired; ERR_PERMISSION_DENIED - Not enough rights to perform the action"
// @Failure 500 {object} errorResponse "Possible messages: ERR_INTERNAL - Error on server"
// @Failure default {object} errorResponse
// @Router /admin/ban-level [post]
func (h *Handler) BanLevel(c *gin.Context) {
	var input entities.LevelBan
	curAccess, exists := c.Get(userAccessCtx)

	if !exists {
		NewErrorResponse(c, http.StatusBadRequest, gotype.ErrAccessToken)
		return
	}

	if err := c.BindJSON(&input); err != nil {
		NewErrorResponse(c, http.StatusBadRequest, gotype.ErrInvalidInput)
		return
	}

	err := h.services.Admin.TryBanLevel(curAccess.(int), input)
	if err != nil {
		NewErrorResponse(c, gotype.CodeErrors[err.Error()], err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{})
}

// @Summary Unban level
// @Tags admin
// @Description Unban level with given id. Available only for moderators and admins
// @ID unban-level
// @Accept json
// @Produce json
// @Param input body entities.LevelBan true "id of level you want to unban"
// @Success 200
// @Failure 400 {object} errorResponse "Possible messages: ERR_ACCESS_TOKEN_WRONG - Wrong structure of Access Token/No Access Token; ERR_ENTITY_NOT_FOUND - Level with such id does not exist; ERR_INVALID_INPUT - Wrong structure of input json;"
// @Failure 401 {object} errorResponse "Possible messages: ERR_UNAUTHORIZED - Access Token expired; ERR_PERMISSION_DENIED - Not enough rights to perform the action"
// @Failure 500 {object} errorResponse "Possible messages: ERR_INTERNAL - Error on server"
// @Failure default {object} errorResponse
// @Router /admin/unban-level [post]
func (h *Handler) UnbanLevel(c *gin.Context) {
	var input entities.LevelBan
	curAccess, exists := c.Get(userAccessCtx)

	if !exists {
		NewErrorResponse(c, http.StatusBadRequest, gotype.ErrAccessToken)
		return
	}

	if err := c.BindJSON(&input); err != nil {
		NewErrorResponse(c, http.StatusBadRequest, gotype.ErrInvalidInput)
		return
	}

	err := h.services.Admin.TryUnbanLevel(curAccess.(int), input)
	if err != nil {
		NewErrorResponse(c, gotype.CodeErrors[err.Error()], err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{})
}

// @Summary Change access level
// @Tags admin
// @Description Change access of a user if your access is greater that theirs. New value must be less than admin's one. Available only for moderators and admins
// @ID change-user-access
// @Accept json
// @Produce json
// @Param input body entities.ChangeUserAccess true "id of user you want to ban, new value of access"
// @Success 200
// @Failure 400 {object} errorResponse "Possible messages: ERR_ACCESS_TOKEN_WRONG - Wrong structure of Access Token/No Access Token; ERR_NO_SUCH_USER - User with such id does not exist; ERR_INVALID_INPUT - Wrong structure of input json;"
// @Failure 401 {object} errorResponse "Possible messages: ERR_UNAUTHORIZED - Access Token expired; ERR_PERMISSION_DENIED - Not enough rights to perform the action"
// @Failure 500 {object} errorResponse "Possible messages: ERR_INTERNAL - Error on server"
// @Failure default {object} errorResponse
// @Router /admin/change-user-access [post]
func (h *Handler) ChangeUserAccess(c *gin.Context) {
	var input entities.ChangeUserAccess
	curAccess, exists := c.Get(userAccessCtx)

	if !exists {
		NewErrorResponse(c, http.StatusBadRequest, gotype.ErrAccessToken)
		return
	}

	if err := c.BindJSON(&input); err != nil {
		NewErrorResponse(c, http.StatusBadRequest, gotype.ErrInvalidInput)
		return
	}

	err := h.services.Admin.TryChangeAccessLevel(curAccess.(int), input)
	if err != nil {
		NewErrorResponse(c, gotype.CodeErrors[err.Error()], err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{})
}
