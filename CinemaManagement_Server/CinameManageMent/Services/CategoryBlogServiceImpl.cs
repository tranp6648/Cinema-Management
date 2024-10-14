using CinameManageMent.Data;
using CinameManageMent.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace CinameManageMent.Services
{
    public class CategoryBlogServiceImpl : CategoryBlogService
    {
        private readonly DatabaseContext _databaseContext;
        public CategoryBlogServiceImpl(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }
        public bool CreateCategoryBlog(AddCategoryBlog addCategoryBlog)
        {
            try
            {
                var sql = "Exec CreateCategoryBlog @Name";
                var parameters = new[]
                {
                    new SqlParameter("@Name",addCategoryBlog.Name)
                };
                var result=_databaseContext.Database.ExecuteSqlRaw(sql, parameters);
                return result > 0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic GetCategory()
        {
            return _databaseContext.CategoryBlogs.FromSqlRaw("Select * From GetCategoryBlog").Select(d => new
            {
                Id=d.Id,
                Name=d.Name,
            }).ToList();
        }
    }
}
