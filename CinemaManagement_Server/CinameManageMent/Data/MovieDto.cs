﻿namespace CinameManageMent.Data
{
    public class MovieDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateOnly ReleaseDate { get; set; }
        public int Duration { get; set; }
        public string Director { get; set; }
        public IFormFile Trailer { get; set; }
        public IFormFile Picture { get; set; }
        public int IdCategory { get; set; }
    }
}
