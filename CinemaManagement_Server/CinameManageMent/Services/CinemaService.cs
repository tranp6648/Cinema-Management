using CinameManageMent.Data;

namespace CinameManageMent.Services
{
    public interface CinemaService
    {
       public bool CreateCineme(AddCinema addCinema);
        public dynamic GetCinema();
        public bool UpdateCinema(int id,AddCinema cinema);
    }
}
