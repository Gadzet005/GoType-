package handler

//
//import (
//	gotype "github.com/Gadzet005/GoType/backend"
//	"github.com/gin-gonic/gin"
//	"golang.org/x/exp/slices"
//	"net/http"
//)
//
//// @Summary Ban user
//// @Tags admin
//// @Description Ban user with given id if your access is greater than theirs. Available only for moderators and admins
//// @ID write-user-complaint
//// @Accept json
//// @Produce json
//// @Param input body gotype.UserComplaint true "new complaint info"
//// @Success 200
//// @Failure 400 {object} errorResponse "Possible messages: ERR_ACCESS_TOKEN_WRONG - Wrong structure of Access Token/No Access Token; ERR_INVALID_INPUT - Wrong structure of input json/Invalid Reason;"
//// @Failure 401 {object} errorResponse "Possible messages: ERR_UNAUTHORIZED - Access Token expired"
//// @Failure 500 {object} errorResponse "Possible messages: ERR_INTERNAL - Error on server"
//// @Failure default {object} errorResponse
//// @Router /user-actions/write-user-complaint [post]
//func (h *Handler) WriteUserComplaint(c *gin.Context) {
//	var input gotype.UserComplaint
//
//	if err := c.BindJSON(&input); err != nil {
//		NewErrorResponse(c, http.StatusBadRequest, gotype.ErrInvalidInput)
//		return
//	}
//
//	if slices.Index(gotype.UserComplaintReasons[:], input.Reason) == -1 {
//		NewErrorResponse(c, http.StatusBadRequest, gotype.ErrInvalidInput)
//		return
//	}
//
//	err := h.services.UserActions.CreateUserComplaint(input)
//	if err != nil {
//		NewErrorResponse(c, gotype.CodeErrors[err.Error()], err.Error())
//		return
//	}
//
//	c.JSON(http.StatusOK, map[string]interface{}{})
//}
