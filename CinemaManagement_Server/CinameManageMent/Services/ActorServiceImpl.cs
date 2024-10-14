using CinameManageMent.Data;
using CinameManageMent.Helper;
using CinameManageMent.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace CinameManageMent.Services
{
    public class ActorServiceImpl : ActorService
    {
        private readonly DatabaseContext databaseContext;
        private IWebHostEnvironment webHostEnvironment;
        private readonly IConfiguration configuration;
        public ActorServiceImpl(DatabaseContext databaseContext, IWebHostEnvironment webHostEnvironment, IConfiguration configuration)
        {
            this.databaseContext = databaseContext;
            this.webHostEnvironment = webHostEnvironment;
            this.configuration = configuration;
        }
        public bool AddActor(AddActor addActor)
        {
            try
            {
                var fileName = FileHelper.GenerateFileName(addActor.Image.FileName);
                var path = Path.Combine(webHostEnvironment.WebRootPath, "Images", fileName);
                using (var fileStream = new FileStream(path, FileMode.Create))
                {
                    addActor.Image.CopyTo(fileStream);
                }
                var sql = "EXEC AddActor @Name,@Nationalty,@Image,@Bio,@Birthday";
                var parameters = new[]
                {
                    new SqlParameter("@Name",addActor.Name),
                    new SqlParameter("@Nationalty",addActor.Nationality),
                    new SqlParameter("@Image",fileName),
                    new SqlParameter("@Bio",addActor.Bio),
                    new SqlParameter("@Birthday",addActor.Birthday)
                };
                var result = databaseContext.Database.ExecuteSqlRaw(sql, parameters);
                return result > 0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic getActor()
        {
            return databaseContext.Actors.FromSqlRaw("Select * From GetActor").Select(d => new
            {
                id = d.Id,
                Name = d.Name,
                Nationality = d.Nationality,
                Image = configuration["ImageUrl"] + d.Image,
                Bio = d.Bio,
                Birthday = d.Birthday,
            }).ToList();
        }
        public void DeletePhoto(string photo)
        {
            try
            {
                string path = Path.Combine(webHostEnvironment.WebRootPath, "Images", photo);
                if (File.Exists(path))
                {
                    File.Delete(path);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error deleting file '{photo}': {ex.Message}");
            }
        }

        public bool UpdateActor(int id, UpdateActor updateActor)
        {
            try
            {
                var result = 0;
                if (updateActor.Image == null)
                {
                    var sql = "EXEC UpdateActorNotImage @Id,@Name,@Nationality,@Birthday";
                    var parameters = new[]
                    {
                        new SqlParameter("@Id",id),
                        new SqlParameter("@Name",updateActor.Name),
                        new SqlParameter("@Nationality",updateActor.Nationality),
                        new SqlParameter("@Birthday",updateActor.Birthday)
                    };
                    result = databaseContext.Database.ExecuteSqlRaw(sql, parameters);
                }
                else
                {
                    var image = databaseContext.Actors
    .FromSqlRaw("SELECT Image FROM dbo.fn_SelectImageByID({0})", id)
    .Select(x => x.Image)
    .FirstOrDefault();
                    DeletePhoto(image);
                    var fileName = FileHelper.GenerateFileName(updateActor.Image.FileName);
                    var path = Path.Combine(webHostEnvironment.WebRootPath, "Images", fileName);
                    using (var fileStream = new FileStream(path, FileMode.Create))
                    {
                        updateActor.Image.CopyTo(fileStream);
                    }
                    var sql = "Exec UpdateActor @Id,@Name,@Nationality,@Image,@Birthday";
                    var parameters = new[]
                    {
                        new SqlParameter("@Id",id),
                        new SqlParameter("@Name",updateActor.Name),
                        new SqlParameter("@Nationality",updateActor.Nationality),
                        new SqlParameter("@Image",fileName),
                        new SqlParameter("@Birthday",updateActor.Birthday),
                    };
                    result = databaseContext.Database.ExecuteSqlRaw(sql, parameters);
                }
                return result > 0;
            }
            catch
            {
                return false;
            }
        }

        public bool DeleteActor(int id)
        {
            try
            {
                var image = databaseContext.Actors
   .FromSqlRaw("SELECT Image FROM dbo.fn_SelectImageByID({0})", id)
   .Select(x => x.Image)
   .FirstOrDefault();
                DeletePhoto(image);
                var idParameter= new SqlParameter("@Id", id);
                var result=databaseContext.Database.ExecuteSqlRaw("Exec DeleteActor @Id",idParameter);
                return result > 0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic GetActorNotin(int id)
        {
            return databaseContext.Actors.FromSqlRaw("Select id,Name From dbo.fn_ActorNotIn({0})", id).Select(d => new
            {
                id=d.Id,
                Name=d.Name
            }).ToList();
        }
    }
}
