using CinameManageMent.Data;
using CinameManageMent.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace CinameManageMent.Services
{
    public class ShowTimeServiceImpl : ShowTimeService
    {
        private readonly DatabaseContext _dbContext;
        public ShowTimeServiceImpl(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }
        public bool AddShowTime(AddShowTime addShowTime)
        {
            DateTime vietnamTime = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(addShowTime.StartDate, "SE Asia Standard Time");

           
            string formattedTime = vietnamTime.ToString("yyyy-MM-dd HH:mm:ss");
            DateTime Endtime = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(addShowTime.EndDate, "SE Asia Standard Time");
            string fEndtime = Endtime.ToString("yyyy-MM-dd HH:mm:ss");
            try
            {
                var sql = "Exec AddShowTime @IdMovie,@StartDate,@EndDate,@idscreen,@idAccount";
                var parameters = new[]
                {
                    new SqlParameter("@IdMovie",addShowTime.idMovie),
                    new SqlParameter("@StartDate",formattedTime),
                    new SqlParameter("@EndDate",fEndtime),
                    new SqlParameter("@idscreen",addShowTime.idscreen),
                    new SqlParameter("@idAccount",addShowTime.idAccountCreate),
                };
                var showtime=_dbContext.ShowTime.FromSqlRaw(sql, parameters).AsEnumerable()
    .Select(a => a.Id)
    .FirstOrDefault();
                foreach(var param in addShowTime.Seats)
                {
                    var sqlparamter = "Exec AddShowTimeSeatPrice @idShowTime,@categorySeatId,@Price";
                    var parameter = new[]
                    {
                        new SqlParameter("@idShowTime",showtime),
                        new SqlParameter("@categorySeatId",param.categorySeatid),
                        new SqlParameter("@Price",param.price)
                    };
                    _dbContext.Database.ExecuteSqlRaw(sqlparamter, parameter);
                }
                return true;
            }
            catch
            {
                return false;
            }
        }

        public dynamic GetShowTime(int id)
        {
            return _dbContext.ShowTime.FromSqlRaw("Select * From GetShowtime({0})", id).Select(d => new
            {
                id=d.Id,
                Movie=d.Movie.Title,
                Duration=d.Movie.Duration,
                idMovie=d.Movie.Id,
                StartDate=d.StartDate,
                EndDate=d.EndDate,
                Screen=d.Screen.Name,
                CategoryPriceScreen = _dbContext.ShowTimeSeatPrices.Where(a => a.showTimeId == d.Id).Select(a => new
                {
                    name=a.categorySeat.Name,
                    Price=a.Price,
                }).ToList()
            }).ToList();
        }

        public bool UpdateShowTime(int id,UpdateShowTime updateShowTime)
        {
            var result = 0;
            DateTime vietnamTime = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(updateShowTime.StartDate, "SE Asia Standard Time");


            string formattedTime = vietnamTime.ToString("yyyy-MM-dd HH:mm:ss");
            DateTime Endtime = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(updateShowTime.EndDate, "SE Asia Standard Time");
            string fEndtime = Endtime.ToString("yyyy-MM-dd HH:mm:ss");
            try
            {
                var sql = "EXEC UpdateShowTime @Id,@EndDate,@StartDate";
                var parameters = new[]
                {
                    new SqlParameter("@Id",id),
                    new SqlParameter("@EndDate",fEndtime),
                    new SqlParameter("@StartDate",formattedTime)
                };
                result=_dbContext.Database.ExecuteSqlRaw(sql, parameters);
                return result > 0;
            }
            catch
            {
                return false;
            }
        }
    }
}
