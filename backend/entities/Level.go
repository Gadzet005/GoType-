package entities

var SortingValues = []string{"asc", "desc"}
var AvailableLanguages = []string{"eng", "rus"}
var AvailableTypes = []string{"classic", "relax"}

type Level struct {
	Id          int      `json:"id" db:"id"`
	AuthorName  string   `json:"author_name" db:"author_name" binding:"required"`
	Name        string   `json:"name" binding:"required" db:"name"`
	Author      int      `json:"author" binding:"required" db:"author"`
	Description string   `json:"description" binding:"required" db:"description"`
	Duration    int      `json:"duration" binding:"required" db:"duration"`
	Tags        []string `json:"tags" binding:"required" db:"tags"`
	Language    string   `json:"language" binding:"required" db:"language"`
	ImageType   string   `json:"image_type" binding:"required" db:"preview_type"`
	Type        string   `json:"type" binding:"required" db:"type"`
	Difficulty  int      `json:"difficulty" binding:"required" db:"difficulty"`
	PreviewPath string   `json:"preview_path" db:"preview_path"`
}

type LevelUpdateStruct struct {
	Id          int      `json:"id" binding:"required"`
	AuthorName  string   `json:"author_name" db:"author_name" binding:"required"`
	Name        string   `json:"name" binding:"required"`
	Author      int      `json:"author" binding:"required"`
	Description string   `json:"description" binding:"required"`
	Duration    int      `json:"duration" binding:"required"`
	Tags        []string `json:"tags" binding:"required"`
	Language    string   `json:"language" binding:"required"`
	ImageType   string   `json:"image_type" binding:"required"`
	Type        string   `json:"type" binding:"required"`
	Difficulty  int      `json:"difficulty" binding:"required"`
}

type GetLevelInfoStruct struct {
	Id int `json:"id" binding:"required"`
}

type LevelSortParams struct {
	Popularity string `json:"popularity"`
	Date       string `json:"date"`
}

type LevelFilterParams struct {
	Difficulty int    `json:"difficulty"`
	Language   string `json:"language"`
	LevelName  string `json:"level_name"`
}

type PageInfo struct {
	PageSize int `json:"page_size" binding:"required"`
	Offset   int `json:"offset" binding:"required"`
}

type FetchLevelStruct struct {
	SortParams   LevelSortParams   `json:"sort_params" binding:"required"`
	FilterParams LevelFilterParams `json:"filter_params"  binding:"required"`
	Tags         []string          `json:"tags" binding:"required"`
	PageInfo     PageInfo          `json:"page_info" binding:"required"`
}

type Tag struct {
	Name string `db:"name"`
}

type LevelTag struct {
	LevelID int    `db:"level_id"`
	TagName string `db:"tag_name"`
}

type LevelsList struct {
	Levels []Level `json:"levels"`
}

type LevelInfo struct {
	MainInfo Level `json:"level_info"`
}
