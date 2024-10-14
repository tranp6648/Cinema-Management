using CinameManageMent.Data;
using CinameManageMent.Helper;
using CinameManageMent.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace CinameManageMent.Services
{
    public class MovieServiceImpl : MovieService
    {
        private readonly DatabaseContext DatabaseContext;
        private IWebHostEnvironment webHostEnvironment;
        private readonly IConfiguration configuration;

        public MovieServiceImpl(DatabaseContext DatabaseContext, IWebHostEnvironment webHostEnvironment, IConfiguration configuration)
        {
            this.DatabaseContext = DatabaseContext;
            this.webHostEnvironment = webHostEnvironment;
            this.configuration = configuration;
        }
        private string SaveVideoToFolder(string base64String, string webrootpath)
        {
            if (base64String.StartsWith("data:video"))
            {
                base64String = base64String.Split(',')[1];
            }

            // Ensure correct padding
            base64String = base64String.PadRight((base64String.Length + 3) & ~3, '=');

            try
            {
                byte[] pictureBytes = Convert.FromBase64String(base64String);
                string folderPath = Path.Combine(webrootpath, "videos");

                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }

                string filename = FileHelper.GenerateFileVideo(base64String);
                string filepath = Path.Combine(folderPath, filename);

                System.IO.File.WriteAllBytes(filepath, pictureBytes);

                return Path.Combine( filename);
            }
            catch (FormatException ex)
            {
                // Log the exception or handle it appropriately
                Console.WriteLine($"Error converting Base64 string: {ex.Message}");
                return null;  // or throw an exception, return an error code, etc.
            }
        }
        private void DeleteMovie(string moviePath,string webrootPath) {
            string ImagePath = Path.Combine(webrootPath, "videos", moviePath);
            if (System.IO.File.Exists(ImagePath))
            {
                System.IO.File.Delete(ImagePath);
            }
        }
        private void DeletePictureFromFolder(string base64String, string webrootpath)
        {
            string ImagePath=Path.Combine(webrootpath,"Images",base64String);
            if (System.IO.File.Exists(ImagePath))
            {
                System.IO.File.Delete(ImagePath);
            }
        }
        private string SavePictureToFolder(string pictureBase64,  string webRootBath)
        {
            // Check for Data URL prefix and remove it
            if (pictureBase64.StartsWith("data:image"))
            {
                pictureBase64 = pictureBase64.Split(',')[1];
            }

            // Ensure correct padding
            pictureBase64 = pictureBase64.PadRight((pictureBase64.Length + 3) & ~3, '=');

            try
            {
                byte[] pictureBytes = Convert.FromBase64String(pictureBase64);
                string folderPath = Path.Combine(webRootBath, "Images");

                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }

                string filename = FileHelper.GenerateFile(pictureBase64);
                string filepath = Path.Combine(folderPath, filename);

                System.IO.File.WriteAllBytes(filepath, pictureBytes);

                return Path.Combine( filename);
            }
            catch (FormatException ex)
            {
                // Log the exception or handle it appropriately
                Console.WriteLine($"Error converting Base64 string: {ex.Message}");
                return null;  // or throw an exception, return an error code, etc.
            }
        }
        public bool AddMovie(MovieDto movieDto)
        {
            try
            {
                string imagePath = SavePictureToFolder(movieDto.Picture, webHostEnvironment.WebRootPath);
                string videoPath = SaveVideoToFolder(movieDto.Trailer, webHostEnvironment.WebRootPath);




                var parameters = new[]
                 {
            new SqlParameter("@Title", movieDto.Title),
            new SqlParameter("@Description", movieDto.Description),
            new SqlParameter("@ReleaseDate", movieDto.ReleaseDate),
            new SqlParameter("@Duration", movieDto.Duration),
            new SqlParameter("@Trailer", videoPath),
            new SqlParameter("@Picture", imagePath),
            new SqlParameter("@Director", movieDto.Director),

            new SqlParameter("@IdCategory",movieDto.IdCategory),

        };

                // Execute the stored procedure
                var result = DatabaseContext.Database.ExecuteSqlRaw
           ("EXEC AddMovie @Title, @Description, @ReleaseDate, @Duration,@Trailer, @Picture, @Director,@IdCategory", parameters);
           

               
               
                return result>0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic GetMovie()
        {
            return DatabaseContext.Movies.FromSqlRaw("Select * From GetMovie").AsEnumerable().Select(d => new
            {
                d.Id,
                d.Title,
                d.Description,
                d.ReleaseDate,
                d.Director,
                Picture=configuration["ImageUrl"]+d.Picture,
                Realedate=d.ReleaseDate,
                d.Duration,
                d.Trailer,

                CategoryName = DatabaseContext.DetailCategoryMovies.Where(a=>a.IdMovie==d.Id).Select(d => new
                {
                    d.Category.Name,
                    d.Category.Id,
                }).FirstOrDefault(),
                ActorROles=DatabaseContext.DetailActorMovies.Where(a => a.IdMovie == d.Id).Select(d => new
                {
                   d.Actor.Id,
                    d.Actor.Name
                }).ToList()
            }).ToList();
        }
        public int saveUpdate(int id,string Title,DateOnly ReleaseDate,int duration,string director,string trailer,string picture,int idCategory)
        {
            var parameter = new[]
               {
                    new SqlParameter("@Id",id),
                    new SqlParameter("@Title",Title),
                    new SqlParameter("@ReleaseDate",ReleaseDate),
                    new SqlParameter("@Duration",duration),
                     new SqlParameter("@Director",director),
                    new SqlParameter("@trailer",trailer),
                    new SqlParameter("@Picture",picture),
                    new SqlParameter("@Idcategory",idCategory),


                };
           var result = DatabaseContext.Database.ExecuteSqlRaw("EXEC UpdateMovie @Id,@Title,@ReleaseDate,@Duration,@Director,@trailer,@Picture,@Idcategory", parameter);
            return result;
        }
    
        public bool UpdateMovie(int id, UpdateMovieDto updateMovieDto)
        {
            try
            {
                var result = 0;
                if (updateMovieDto.Trailer != null && updateMovieDto.Picture != null)
                {
                    var media = DatabaseContext.Movies.FromSqlRaw("Select * From dbo.GetMovieMedia({0})", id).FirstOrDefault();
                    DeletePictureFromFolder(media.Picture, webHostEnvironment.WebRootPath);
                    DeleteMovie(media.Trailer, webHostEnvironment.WebRootPath);
                    string imagePath = SavePictureToFolder(updateMovieDto.Picture, webHostEnvironment.WebRootPath);
                    string videoPath = SaveVideoToFolder(updateMovieDto.Trailer, webHostEnvironment.WebRootPath);

                    result = saveUpdate(id, updateMovieDto.Title, updateMovieDto.ReleaseDate, updateMovieDto.Duration, updateMovieDto.Director, videoPath, imagePath, updateMovieDto.IdCategory);
                }else if(updateMovieDto.Trailer==null && updateMovieDto.Picture != null)
                {
                    var media = DatabaseContext.Movies.FromSqlRaw("Select * From dbo.GetMovieMedia({0})", id).FirstOrDefault();
                    DeletePictureFromFolder(media.Picture, webHostEnvironment.WebRootPath);
                    string imagePath = SavePictureToFolder(updateMovieDto.Picture, webHostEnvironment.WebRootPath);
                    result = saveUpdate(id, updateMovieDto.Title, updateMovieDto.ReleaseDate, updateMovieDto.Duration, updateMovieDto.Director, media.Trailer, imagePath, updateMovieDto.IdCategory);
                }else if(updateMovieDto.Trailer != null && updateMovieDto.Picture == null)
                {
                    var media = DatabaseContext.Movies.FromSqlRaw("Select * From dbo.GetMovieMedia({0})", id).FirstOrDefault();
                    DeleteMovie(media.Trailer, webHostEnvironment.WebRootPath);
                    string videoPath = SaveVideoToFolder(updateMovieDto.Trailer, webHostEnvironment.WebRootPath);
                    result = saveUpdate(id, updateMovieDto.Title, updateMovieDto.ReleaseDate, updateMovieDto.Duration, updateMovieDto.Director, videoPath, media.Picture, updateMovieDto.IdCategory);
                }
                else
                {
                    var media = DatabaseContext.Movies.FromSqlRaw("Select * From dbo.GetMovieMedia({0})", id).FirstOrDefault();

                    result = saveUpdate(id, updateMovieDto.Title, updateMovieDto.ReleaseDate, updateMovieDto.Duration, updateMovieDto.Director, media.Trailer, media.Picture, updateMovieDto.IdCategory);



                    
                }
                return result > 0;
            }
            catch
            {
                return false;
            }
           
            
        }

        public bool DeleteMovie(int id)
        {
            try
            {
                var image = DatabaseContext.Movies
   .FromSqlRaw("SELECT Picture,Trailer FROM dbo.fn_SelectMovieId({0})", id)
   .Select(x => new { x.Picture, x.Trailer }).FirstOrDefault();
                this.DeletePictureFromFolder(image.Picture, webHostEnvironment.WebRootPath);
                this.DeleteMovie(image.Trailer,webHostEnvironment.WebRootPath);
                var idParameter = new SqlParameter("@Id", id);
                var result = DatabaseContext.Database.ExecuteSqlRaw("Exec DeleteMovie @Id", idParameter);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool AddActorMovie(ActorMovieDTO actorMovieDto)
        {
            try
            {
                var idMovie = new SqlParameter("@idMovie", actorMovieDto.idMovie);
                var idActor = new SqlParameter("@idActor", actorMovieDto.idActor);
                var Role = new SqlParameter("@Role", actorMovieDto.Role);
                var result = DatabaseContext.Database.ExecuteSqlRaw("Exec AddMovieActor @IdMovie,@IdActor,@Role", idMovie, idActor, Role);
                return result > 0;
            }
            catch
            {
                return false;
            }
           
        }
    }
}
