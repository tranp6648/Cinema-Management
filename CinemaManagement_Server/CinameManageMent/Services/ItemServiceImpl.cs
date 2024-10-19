using CinameManageMent.Data;
using CinameManageMent.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace CinameManageMent.Services
{
    public class ItemServiceImpl : ItemService
    {
        private readonly DatabaseContext databaseContext;
        public ItemServiceImpl(DatabaseContext databaseContext)
        {
            this.databaseContext = databaseContext;
        }
        public bool CreateItem(CreateItem createItem)
        {
            try
            {
                var sql = "EXEC AddItem @Name,@Category";
                var parameters = new[]
                {
                    new SqlParameter("@Name",createItem.Name),
                    new SqlParameter("@Category",createItem.Category)
                };
                var result=databaseContext.Database.ExecuteSqlRaw(sql, parameters);
                return result > 0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic GetItem()
        {
            return databaseContext.Item.FromSqlRaw("SELECT * FROM GetItem").ToList();
        }
    }
}
