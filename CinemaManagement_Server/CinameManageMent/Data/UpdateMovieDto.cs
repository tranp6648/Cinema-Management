namespace CinameManageMent.Data
{
    public class UpdateMovieDto
    {

        public string Title { get; set; }
      
        public DateOnly ReleaseDate { get; set; }
        public int Duration { get; set; }
        public string Director { get; set; }
        public string? Trailer { get; set; }
        public string? Picture { get; set; }
        public int IdCategory { get; set; }
    }
}
