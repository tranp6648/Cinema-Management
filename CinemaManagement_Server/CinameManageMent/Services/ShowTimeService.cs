using CinameManageMent.Data;
using CinameManageMent.Models;

namespace CinameManageMent.Services
{
    public interface ShowTimeService
    {
        public bool AddShowTime(AddShowTime addShowTime);
        public dynamic GetShowTime(int id);
        public bool UpdateShowTime(int id,UpdateShowTime updateShowTime);
        public dynamic GetAllTime(int id);
        public dynamic GetInfo(DateTime dateTime,int id);
        public dynamic GetSeat(int id);
        public int CountShowTime();
        public int CountShowTimeAdmin(int id);
    }
}
