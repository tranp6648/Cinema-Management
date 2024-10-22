using CinameManageMent.Data;
using CinameManageMent.Models;

namespace CinameManageMent.Services
{
    public interface ShowTimeService
    {
        public bool AddShowTime(AddShowTime addShowTime);
        public dynamic GetShowTime(int id);
        public bool UpdateShowTime(int id,UpdateShowTime updateShowTime);
    }
}
