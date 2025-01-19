package handler

//
//// @Summary Create level
//// @Tags level
//// @Description Create level with given structure
//// @ID level
//// @Accept json
//// @Produce json
//// @Param input body UserBan true "id of user you want to ban, duration of ban (format 10h), ban_reason"
//// @Success 200
//// @Failure 400 {object} errorResponse "Possible messages: ERR_ACCESS_TOKEN_WRONG - Wrong structure of Access Token/No Access Token; ERR_NO_SUCH_USER - User with such id does not exist; ERR_INVALID_INPUT - Wrong structure of input json/Wrong format of ban duration;"
//// @Failure 401 {object} errorResponse "Possible messages: ERR_UNAUTHORIZED - Access Token expired; ERR_PERMISSION_DENIED - Not enough rights to perform the action"
//// @Failure 500 {object} errorResponse "Possible messages: ERR_INTERNAL - Error on server"
//// @Failure default {object} errorResponse
//// @Router /admin/ban-user [post]
//func (h *Handler) BanUser(c *gin.Context) {
//	var input entities.UserBan
//	curAccess, exists := c.Get(userAccessCtx)
//
//	if !exists {
//		NewErrorResponse(c, http.StatusBadRequest, gotype.ErrAccessToken)
//		return
//	}
//
//	if err := c.BindJSON(&input); err != nil {
//		NewErrorResponse(c, http.StatusBadRequest, gotype.ErrInvalidInput)
//		return
//	}
//
//	err := h.services.Admin.TryBanUser(curAccess.(int), input)
//	if err != nil {
//		NewErrorResponse(c, gotype.CodeErrors[err.Error()], err.Error())
//		return
//	}
//
//	c.JSON(http.StatusOK, map[string]interface{}{})
//}
