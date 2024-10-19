using CinameManageMent.Data;
using CinameManageMent.Helper;
using CinameManageMent.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace CinameManageMent.Services
{
    public class BlogServiceImpl : BlogService
    {
        private readonly DatabaseContext databaseContext;
        private readonly IWebHostEnvironment webHostEnvironment;
        private readonly IConfiguration configuration;
        public BlogServiceImpl(DatabaseContext databaseContext, IWebHostEnvironment webHostEnvironment, IConfiguration configuration)
        {
            this.databaseContext = databaseContext;
            this.webHostEnvironment = webHostEnvironment;
            this.configuration = configuration;
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

        public bool CreateBlog(AddBlog blog)
        {
            try
            {
                var fileName=FileHelper.GenerateFileName(blog.ImageUrl.FileName);
                var path=Path.Combine(webHostEnvironment.WebRootPath,"Images",fileName);
                using(var filestream=new FileStream(path, FileMode.Create))
                {
                    blog.ImageUrl.CopyTo(filestream);
                }
                var sql = "EXEC AddBlog @Title,@IdCategoryBlog,@ImageUrl,@ContentBlog";
                var parameters = new[]
                {
                    new SqlParameter("@Title",blog.Title),
                    
                    new SqlParameter("@IdCategoryBlog",blog.idCategoryBlog),
                    new SqlParameter("@ImageUrl",fileName),
                    new SqlParameter("@ContentBlog",blog.ContentBlog)
                };
                var result=databaseContext.Database.ExecuteSqlRaw(sql, parameters);
                return result > 0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic GetBlog()
        {
           
                return databaseContext.Blogs.FromSqlRaw("Select * From GetBlog").ToList();
           
        }

        public bool UpdateStatus(int id, UpdateStatus status)
        {
            try
            {
                var sql = "EXEC UpdateStatus @Id,@Status";
                var parameters = new[]
                {
                    new SqlParameter("@Id",id),
                new SqlParameter("@Status",status.status),
                };
                var result=databaseContext.Database.ExecuteSqlRaw(sql,parameters);
                return result > 0;
            }
            catch
            {
                return false;
            }
        }

        public bool Updateblog(int id, UpdateBlog blog)
        {
            try
            {
                var result = 0;
                if(blog.Image== null)
                {
                    var image = databaseContext.Blogs
.FromSqlRaw("SELECT ImageUrl FROM dbo.fn_SelectBannerBlog({0})", id)
.Select(x => x.ImageUrl)
.FirstOrDefault();
                    var sql = "EXEC UpdateBlog @Id,@Title,@IdCategoryblog";
                    var parameters = new[]
                    {
                        new SqlParameter("@Id",id),
                        new SqlParameter("@Title",blog.Title),
                        new SqlParameter("@IdCategoryblog",blog.idCategoryBlog),
                        new SqlParameter("@ImageUrl",image)
                    };
                    result=databaseContext.Database.ExecuteSqlRaw(sql,parameters);
                }
                else
                {
                    var image = databaseContext.Blogs
.FromSqlRaw("SELECT ImageUrl FROM dbo.fn_SelectBannerBlog({0})", id)
.Select(x => x.ImageUrl)
.FirstOrDefault();
                    DeletePhoto(image);
                    var fileName = FileHelper.GenerateFileName(blog.Image.FileName);
                    var path = Path.Combine(webHostEnvironment.WebRootPath, "Images", fileName);
                    using (var filestream = new FileStream(path, FileMode.Create))
                    {
                        blog.Image.CopyTo(filestream);
                    }
                    var sql = "EXEC UpdateBlog @Id,@Title,@IdCategoryblog,@ImageUrl";
                    var parameters = new[]
                    {
                        new SqlParameter("@Id",id),
                        new SqlParameter("@Title",blog.Title),
                        new SqlParameter("@IdCategoryblog",blog.idCategoryBlog),
                        new SqlParameter("@ImageUrl",fileName)
                    };
                    result = databaseContext.Database.ExecuteSqlRaw(sql, parameters);
                }
                return result > 0;
            }
            catch
            {
                return false ;
            }
        }
    }
}
