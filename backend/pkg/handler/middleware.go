package handler

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"strings"
	"time"
)

const (
	AuthorizationHeader = "Authorization"
	userIdCtx           = "id"
	userAccessCtx       = "access"
)

func (h *Handler) UserIdentity(c *gin.Context) {
	header := c.GetHeader(AuthorizationHeader)

	if header == "" {
		NewErrorResponse(c, http.StatusUnauthorized, "No Authorization header")
		return
	}

	headerParts := strings.Split(header, " ")
	if len(headerParts) != 2 {
		NewErrorResponse(c, http.StatusUnauthorized, "Invalid Authorization header")
		return
	}
	//fmt.Print("AAAAAAAAAAAAAAAAA\n")
	expTime, id, access, err := h.services.Authorization.Parse(headerParts[1])
	//fmt.Print("BBBBBBBBBBBBBBBBB\n")
	if err != nil {
		NewErrorResponse(c, http.StatusUnauthorized, "Invalid Authorization header")
		return
	}

	if expTime.Before(time.Now()) {
		NewErrorResponse(c, http.StatusUnauthorized, "Access token expired")
		return
	}

	c.Set(userIdCtx, id)
	c.Set(userAccessCtx, access)
}
