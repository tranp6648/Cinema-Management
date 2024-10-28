using CinameManageMent.Data;
using CinameManageMent.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;

namespace CinameManageMent.Services
{
    public class CinemaServiceImpl : CinemaService
    {
        private readonly DatabaseContext databaseContext;
        public CinemaServiceImpl(DatabaseContext databaseContext)
        {
            this.databaseContext = databaseContext;
        }

        public int CountCinema()
        {
            return databaseContext.Cinemas.Where(d=>d.Status==true).Count();
        }

        public bool CreateCineme(AddCinema addCinema)
        {
            try
            {
                var sql = "EXEC CreateCinema @District,@IdManager,@NameCinema,@Address,@PhoneNumber";
                var paramters = new[]
                {
                    new SqlParameter("@District",addCinema.District),
                    new SqlParameter("@IdManager",addCinema.idManager),
                    new SqlParameter("@NameCinema",addCinema.Name),
                    new SqlParameter("@Address",addCinema.Address),
                    new SqlParameter("@PhoneNumber",addCinema.PhoneNumber),
                };
                var result=databaseContext.Database.ExecuteSqlRaw(sql, paramters);
                return result > 0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic GetCinema()
        {
           return databaseContext.Cinemas.FromSqlRaw("Select * From GetCinema").Select(d => new
           {
               id=d.Id,
               name=d.Name,
               status=d.Status,
               IdDistrict=d.District.id,
               District=d.District.name,
               Address=d.Address,
               PhoneNumber=d.PhoneNumber,
               idCinema=databaseContext.Screen.Where(X=>X.CinemaId==d.Id).Select(X=>X.CinemaId).FirstOrDefault(),
               Manager = databaseContext.Accounts.Where(a => a.Id == d.IdManager).Select(a => new
               {
                   ManagerAdmin=a.Username,
                   idManager=a.Id
               }).FirstOrDefault()
           }).ToList();
        }

        public dynamic GetDistrict()
        {
            return databaseContext.Districts.FromSqlRaw("Select * From GetDistrict").ToList();  
        }
        
        public bool UpdateCinema(int id, AddCinema cinema)
        {
            try
            {
                var sql = "Exec UpdateCinema @Id,@Name,@District,@Address,@PhoneNumber,@idManager";
                var parameters = new[]
                {
                    new SqlParameter("@Id",id),
                    new SqlParameter("@Name",cinema.Name),
                    new SqlParameter("@District",cinema.District),
                    new SqlParameter("@Address",cinema.Address),
                    new SqlParameter("@PhoneNumber",cinema.PhoneNumber),
                    new SqlParameter("@idManager",cinema.idManager)
                };
                var result= databaseContext.Database.ExecuteSqlRaw(sql, parameters);
                return result > 0;
            }
            catch
            {
                return false;
            }
        }
    }
}
