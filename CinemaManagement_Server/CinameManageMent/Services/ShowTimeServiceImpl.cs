using CinameManageMent.Data;
using CinameManageMent.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;

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
                foreach(var feedbackscreen in addShowTime.SeatsById)
                {
                    var sqlparamterseat = "Exec AddShowTimeSeat @IdShowTime,@IdScreen";
                    var param = new[]
                    {
                        new SqlParameter("@IdShowTime",showtime),
                        new SqlParameter("@IdScreen",feedbackscreen.idScreen)
                    };
                    _dbContext.Database.ExecuteSqlRaw(sqlparamterseat, param);
                }
                return true;
            }
            catch
            {
                return false;
            }
        }

        public int CountShowTime()
        {
            return _dbContext.ShowTime.Count();
        }

        public int CountShowTimeAdmin(int id)
        {
            return _dbContext.ShowTime.Where(a => _dbContext.Screen.Any(b => b.Id == a.IdScreen && b.Cinema.IdManager == id)).Count();
        }

        public dynamic GetAllTime(int id)
        {
            DateTime currentDate = DateTime.Now;
            DateTime endDate = currentDate.AddDays(10);
            return _dbContext.ShowTime.FromSqlRaw("Select * From dbo.GetAllTime({0})", id).Where(a => a.StartDate >= currentDate ).ToList();
        }

        public dynamic GetInfo(DateTime dateTime, int id)
        {

            return _dbContext.ShowTime.FromSqlRaw("Select * From dbo.GetShowtime({0})", id).Where(a => a.StartDate.Year ==a.StartDate.Year && a.StartDate.Month == dateTime.Month && a.StartDate.Day == dateTime.Day).Select(d => new
            {

                id = d.Id,
                idTime = d.Id,
                Auth = d.Screen.Cinema.Id,
                Ditrict = d.Screen.Cinema.District.name,
                Time = d.StartDate,
                Cinema = d.Screen.Cinema.Name
            });
        }
        public dynamic GetSeat(int id)
        {
            return _dbContext.ShowTime.FromSqlRaw("Select * From dbo.GetSeat({0})", id).Select(d => new
            {
                id = d.Id,
                EndDate = d.EndDate,
                StartDate = d.StartDate.ToString("dddd, dd/MM/yyyy", new System.Globalization.CultureInfo("vi-VN")),
                ImageMovie=d.Movie.Picture,
                Movie=d.Movie.Title,
                Cinema=d.Screen.Cinema.Name,
                Screen=d.Screen.Name,
                Time = d.StartDate.ToString("HH:mm"),
                Seat = _dbContext.SeatMovieTimes.Where(a => a.IdShowTime==d.Id).Select(a => new
                {
                    id = a.idScreen,
                    CategorySeat = _dbContext.DetailSeats.Where(b => b.Id == a.idScreen).Select(b => new
                    {
                        Category=b.CategorySeat.Name,
                    }).FirstOrDefault(),
                    seatName= _dbContext.DetailSeats.Where(b => b.Id == a.idScreen).Select(b => new
                    {
                        Name= b.name,
                        Price = _dbContext.ShowTimeSeatPrices.Where(c => c.categorySeatId == b.CategorySeat.Id && c.showTimeId == id).Select(b => new
                        {
                            priceseat = b.Price
                        }).FirstOrDefault(),
                    }).FirstOrDefault(),
                 
                   status=a.Status
                }).ToList(),

            }).FirstOrDefault();
        }
        public dynamic GetShowTime(int id)
        {
            return _dbContext.ShowTime.FromSqlRaw("Select * From dbo.GetTime({0})", id).Select(d => new
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
