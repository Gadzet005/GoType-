package handler

import (
	gotype "github.com/Gadzet005/GoType/backend"
	"github.com/gin-gonic/gin"
	"golang.org/x/exp/slices"
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
		return
	}

	err := h.services.UserActions.DropRefreshToken(curId.(int))

	if err != nil {
		NewErrorResponse(c, gotype.CodeErrors[err.Error()], err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{})
}

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
	curId, exists := c.Get("id")

	if !exists {
		NewErrorResponse(c, http.StatusBadRequest, gotype.ErrAccessToken)
		return
	}

	username, access, banTime, banReason, err := h.services.UserActions.GetUserById(curId.(int))

	if err != nil {
		NewErrorResponse(c, gotype.CodeErrors[err.Error()], err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"id":        curId,
		"username":  username,
		"access":    access,
		"banTime":   banTime,
		"banReason": banReason,
	})
}

// @Summary Write User Complaint
// @Tags user-actions
// @Description Send user complaint to server. Possible Reason values: Cheating, Offencive nickname, Unsportsmanlike conduct
// @ID write-user-complaint
// @Accept json
// @Produce json
// @Param input body gotype.UserComplaint true "new complaint info"
// @Success 200
// @Failure 400 {object} errorResponse "Possible messages: ERR_ACCESS_TOKEN_WRONG - Wrong structure of Access Token/No Access Token; ERR_INVALID_INPUT - Wrong structure of input json/Invalid Reason;"
// @Failure 401 {object} errorResponse "Possible messages: ERR_UNAUTHORIZED - Access Token expired"
// @Failure 500 {object} errorResponse "Possible messages: ERR_INTERNAL - Error on server"
// @Failure default {object} errorResponse
// @Router /user-actions/write-user-complaint [post]
func (h *Handler) WriteUserComplaint(c *gin.Context) {
	var input gotype.UserComplaint

	if err := c.BindJSON(&input); err != nil {
		NewErrorResponse(c, http.StatusBadRequest, gotype.ErrInvalidInput)
		return
	}

	if slices.Index(gotype.UserComplaintReasons[:], input.Reason) == -1 {
		NewErrorResponse(c, http.StatusBadRequest, gotype.ErrInvalidInput)
		return
	}

	err := h.services.UserActions.CreateUserComplaint(input)
	if err != nil {
		NewErrorResponse(c, gotype.CodeErrors[err.Error()], err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{})
}

// @Summary Write Level Complaint
// @Tags user-actions
// @Description Send level complaint to server. Possible Reason values: Offencive name, Offencive video, Offencive audio, Offencive text
// @ID write-level-complaint
// @Accept json
// @Produce json
// @Param input body gotype.LevelComplaint true "new complaint info"
// @Success 200
// @Failure 400 {object} errorResponse "Possible messages: ERR_ACCESS_TOKEN_WRONG - Wrong structure of Access Token/No Access Token; ERR_INVALID_INPUT - Wrong structure of input json/Invalid Reason;"
// @Failure 401 {object} errorResponse "Possible messages: ERR_UNAUTHORIZED - Access Token expired"
// @Failure 500 {object} errorResponse "Possible messages: ERR_INTERNAL - Error on server"
// @Failure default {object} errorResponse
// @Router /user-actions/write-level-complaint [post]
func (h *Handler) WriteLevelComplaint(c *gin.Context) {
	var input gotype.LevelComplaint

	if err := c.BindJSON(&input); err != nil {
		NewErrorResponse(c, http.StatusBadRequest, gotype.ErrInvalidInput)
		return
	}

	if slices.Index(gotype.LevelComplaintReasons[:], input.Reason) == -1 {
		NewErrorResponse(c, http.StatusBadRequest, gotype.ErrInvalidInput)
		return
	}

	err := h.services.UserActions.CreateLevelComplaint(input)
	if err != nil {
		NewErrorResponse(c, gotype.CodeErrors[err.Error()], err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{})
}
