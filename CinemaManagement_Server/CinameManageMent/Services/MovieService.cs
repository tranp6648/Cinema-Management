using CinameManageMent.Data;

namespace CinameManageMent.Services
{
    public interface MovieService
    {
        public bool AddMovie(MovieDto movieDto);
        public bool AddActorMovie(ActorMovieDTO actorMovieDto);
        public dynamic GetMovie();
        public bool UpdateMovie(int id,UpdateMovieDto updateMovieDto);
        public bool UpdateDescriptionMovie(int id, UpdateDescription updateDescription);
        public dynamic DetailMovie(int id);
        public dynamic DetailActor(int id);
    }
}
