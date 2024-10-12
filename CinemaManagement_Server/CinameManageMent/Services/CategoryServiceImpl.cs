using CinameManageMent.Data;
using CinameManageMent.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace CinameManageMent.Services
{
    public class CategoryServiceImpl : CategoryService
    {
        private readonly DatabaseContext databaseContext;
        public CategoryServiceImpl(DatabaseContext databaseContext)
        {
            this.databaseContext = databaseContext;
        }
        public bool AddCategory(AddCategory category)
        {
            try
            {
                var NameParameter=new SqlParameter("@Name",category.Name);
                var result = databaseContext.Database.ExecuteSqlRaw("Exec AddCategory @Name", NameParameter);
                return result > 0;
            }
            catch
            {
                return false;
            }
        }

        public bool DeleteCategory(int id)
        {
            try
            {
                var idparameter = new SqlParameter("@Id", id);
                var result = databaseContext.Database.ExecuteSqlRaw("Exec DeleteCategory @Id", idparameter);
                return result > 0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic GetCategory()
        {
            return databaseContext.Categories.FromSqlRaw("SELECT * FROM GetCategory").ToList();
        }

        public bool UpdateCategory(int id, AddCategory addCategory)
        {
            try
            {
                var idparameter=new SqlParameter("@Id",id);
                var NameParameter = new SqlParameter("@Name", addCategory.Name);
                var result=databaseContext.Database.ExecuteSqlRaw("Exec UpdateCategory @Id,@Name",idparameter,NameParameter);
                return result > 0;
            }
            catch
            {
                return false;
            }
        }
    }
}
