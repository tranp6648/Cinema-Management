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
                var sql = "EXEC AddBlog @Title,@IdAccountCreated,@IdCategoryBlog,@ImageUrl,@ContentBlog";
                var parameters = new[]
                {
                    new SqlParameter("@Title",blog.Title),
                    new SqlParameter("@IdAccountCreated",blog.idAccountCreated),
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
    }
}
