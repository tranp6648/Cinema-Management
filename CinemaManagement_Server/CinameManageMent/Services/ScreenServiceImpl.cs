using CinameManageMent.Data;
using CinameManageMent.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace CinameManageMent.Services
{
    public class ScreenServiceImpl : ScreenService
    {
        private readonly DatabaseContext databaseContext;
        public ScreenServiceImpl(DatabaseContext databaseContext)
        {
            this.databaseContext = databaseContext;
        }
        public bool CreateScreen(List<CreateSeat> seatList)
        {
           foreach(var seat in seatList)
            {
                var sql = "EXEC CreateSeat @idCinema,@Capacity,@Name";
                var parameters = new[]
                {
                    new SqlParameter("@idCinema",seat.idCinema),
                    new SqlParameter("@Capacity",seat.Capacity),
                    new SqlParameter("@Name",seat.Name),
                };
                var result = databaseContext.Screen.FromSqlRaw(sql, parameters).AsEnumerable()
    .Select(a => a.Id)
    .FirstOrDefault();
                foreach( var detailseat in seat.Details)
                {
                    var sqlDetail = "EXEC CreateDetailSeat @idscreen,@idcategoryseat";
                    var parametersDetail = new[]
                    {
                        new SqlParameter("@idscreen",result),
                        new SqlParameter("@idcategoryseat",detailseat.idCategorySeat),
                    };
                    databaseContext.Database.ExecuteSqlRaw(sqlDetail, parametersDetail);
                }
            }
           return true;
        }

        public dynamic ShowDetailSeat(int seatId)
        {
            return databaseContext.Screen.FromSqlRaw("Select * From dbo.DetailSeat({0})",seatId).Select(d => new
            {
                id=d.Id,
                Capacity=d.Capacity,
                CinemaId=d.CinemaId,
                Name=d.Name,
                TotalVipSeat=databaseContext.DetailSeats.Where(a=>a.idScreen==d.Id && a.idCategorySeat==2).Count(),
                TotalNormal = databaseContext.DetailSeats.Where(a => a.idScreen == d.Id && a.idCategorySeat == 1).Count(),
                seatDetails = databaseContext.DetailSeats.Where(a => a.idScreen == d.Id).Select(a => new
                {
                    Id=a.Id,
                    idscreen=a.idScreen,
                    idcategoryscreen=a.idCategorySeat
                }).ToList()
            }).ToList();
        }
    }
}
