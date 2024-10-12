using CinameManageMent.Data;

namespace CinameManageMent.Services
{
    public interface MovieService
    {
        public bool AddMovie(MovieDto movieDto);
        public bool AddActorMovie(ActorMovieDTO actorMovieDto);
        public dynamic GetMovie();
        public bool UpdateMovie(int id,UpdateMovieDto updateMovieDto);
        public bool DeleteMovie(int id);
    }
}
