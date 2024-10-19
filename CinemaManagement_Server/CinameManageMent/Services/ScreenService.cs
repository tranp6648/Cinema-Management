using CinameManageMent.Data;

namespace CinameManageMent.Services
{
    public interface ScreenService
    {
        public bool CreateScreen(List<CreateSeat> seatList);
        public dynamic ShowDetailSeat(int seatId);  
    }
}
