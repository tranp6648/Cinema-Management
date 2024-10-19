using CinameManageMent.Data;
using CinameManageMent.Helper;
using CinameManageMent.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace CinameManageMent.Services
{
    public class ComboItemServiceImpl : ComboItemService
    {
        private readonly DatabaseContext  databaseContext;
        private readonly IWebHostEnvironment webHostEnvironment;
        private readonly IConfiguration configuration;
        public ComboItemServiceImpl(DatabaseContext databaseContext,IWebHostEnvironment webHostEnvironment, IConfiguration configuration)
        {
            this.databaseContext = databaseContext;
            this.webHostEnvironment = webHostEnvironment;
            this.configuration = configuration;
        }
        private string SavePictureToFolder(string pictureBase64, string webRootBath)
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

                return Path.Combine(filename);
            }
            catch (FormatException ex)
            {
                // Log the exception or handle it appropriately
                Console.WriteLine($"Error converting Base64 string: {ex.Message}");
                return null;  // or throw an exception, return an error code, etc.
            }
        }
        public bool AddCombo(AddCombo addCombo)
        {
            try
            {
                string ImagePath = SavePictureToFolder(addCombo.Banner, webHostEnvironment.WebRootPath);
                var sql = "EXEC AddCombo @Name,@price,@banner";
                var parameters = new[]
                {
                    new SqlParameter("@Name",addCombo.Name),
                    new SqlParameter("@price",addCombo.price),
                    new SqlParameter("@banner",ImagePath),
                };
                var result = databaseContext.Combos.FromSqlRaw(sql, parameters).AsEnumerable()
   .Select(a => a.id)
   .FirstOrDefault();
                foreach(var item in addCombo.Items)
                {
                    var sqlComboItem = "EXEC AddComboItems @idCombo,@idItem,@Quantity";
                    var parametersItem = new[]
                    {
                        new SqlParameter("@idCombo",result),
                        new SqlParameter("@idItem",item.idItem),
                        new SqlParameter("@Quantity",item.Quantity)
                    };
                    databaseContext.Database.ExecuteSqlRaw(sqlComboItem, parametersItem);
                }
                return true;
            }
            catch
            {
                return false;
            }
        }

        public dynamic GetComboItem()
        {
            return databaseContext.Combos.FromSqlRaw("Select * From GetComboItem").AsEnumerable().Select(d => new
            {
                id=d.id,
                Name=d.name,
                Price=d.price,
                Banner= configuration["ImageUrl"]+d.banner,
                Item = databaseContext.ComboItems.Where(a => a.idCombo == d.id).Select(a => new
                {
                    iditem=a.Item.Id,
                    NameItem=a.Item.Name,
                }).ToList()
            }).ToList();
        }
        private void DeletePictureFromFolder(string base64String, string webrootpath)
        {
            string ImagePath = Path.Combine(webrootpath, "Images", base64String);
            if (System.IO.File.Exists(ImagePath))
            {
                System.IO.File.Delete(ImagePath);
            }
        }
        public bool UpdateCombo(int id, UpdateCombo updateCombo)
        {
            try
            {
                var result = 0;
                if (updateCombo.banner == null)
                {
                    var image = databaseContext.Combos
  .FromSqlRaw("SELECT banner FROM dbo.fn_SelectBannerCombo({0})", id)
  .Select(x => x.banner)
  .FirstOrDefault();
                    var sql = "EXEC UpdateCombo @Id,@name,@price,@banner";
                    var parameters = new[]
                    {
                        new SqlParameter("@Id",id),
                        new SqlParameter("@name",updateCombo.Name),
                        new SqlParameter("@price",updateCombo.price),
                        new SqlParameter("@banner",image)
                    };
                    result=databaseContext.Database.ExecuteSqlRaw(sql, parameters);
                }
                else
                {
                    var image = databaseContext.Combos
.FromSqlRaw("SELECT Image FROM dbo.fn_SelectBannerCombo({0})", id)
.Select(x => x.banner).FirstOrDefault();
                    DeletePictureFromFolder(image,webHostEnvironment.WebRootPath);
                    string ImagePath = SavePictureToFolder(updateCombo.banner, webHostEnvironment.WebRootPath);
                    var sql = "EXEC UpdateCombo @Id,@name,@price,@banner";
                    var parameters = new[]
                    {
                        new SqlParameter("@Id",id),
                        new SqlParameter("@name",updateCombo.Name),
                        new SqlParameter("@price",updateCombo.price),
                        new SqlParameter("@banner",ImagePath)
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
    }
}
