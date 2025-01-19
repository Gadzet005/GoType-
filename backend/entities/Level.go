package entities

type Level struct {
	Name        string `json:"name" binding:"required"`
	Author      int    `json:"author" binding:"required"`
	Description string `json:"description" binding:"required"`
}
