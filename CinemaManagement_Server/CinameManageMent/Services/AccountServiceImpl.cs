using CinameManageMent.Data;
using CinameManageMent.Helper;
using CinameManageMent.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Net;
using System.Net.Mail;

namespace CinameManageMent.Services
{
    public class AccountServiceImpl : AccountService    
    {
        private readonly DatabaseContext databaseContext;
        private readonly IWebHostEnvironment webHostEnvironment;
        private readonly IConfiguration configuration;
        public AccountServiceImpl(DatabaseContext databaseContext,IWebHostEnvironment webHostEnvironment,IConfiguration configuration)
        {
            this.databaseContext = databaseContext;
            this.webHostEnvironment = webHostEnvironment;
            this.configuration = configuration;
        }
        private void SendEmail(string to, string subject, string body)
        {
            using (var client = new SmtpClient("smtp.gmail.com"))
            {
                client.Port = 587;
                client.Credentials = new NetworkCredential("tranp6648@gmail.com", "akly huwn xldc aiix");
                client.EnableSsl = true;
                var message = new MailMessage
                {
                    From = new MailAddress("tranp6648@gmail.com"),
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = false
                };
                message.To.Add(to);
                client.Send(message);
            }
        }
        public string GenerateRandomString(int length)
        {
            string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?";
            Random random = new Random();
            char[] StringChars = new char[length];
            for (int i = 0; i < length; i++)
            {
                int randomIndex = random.Next(chars.Length);
                StringChars[i] = chars[randomIndex];
            }
            return new string(StringChars);
        }
        public bool Register(RegisterAccount registerAccount)
        {
            try
            {
                string password = GenerateRandomString(8);
                var Fullname = new SqlParameter("@FullName", registerAccount.FullName);
                var Username = new SqlParameter("@Username", registerAccount.username);
                var Email = new SqlParameter("@Email", registerAccount.Email);
                var Password = new SqlParameter("@Password", BCrypt.Net.BCrypt.HashPassword(password));
                var Phone = new SqlParameter("@Phone", registerAccount.Phone);
                var Birthday = new SqlParameter("@Birthday", registerAccount.Birthday);
                databaseContext.Database.ExecuteSqlRaw("EXEC sp_RegisterAccount @FullName,@Username,@Email,@Password,@Phone,@Birthday", Fullname, Username, Email, Password, Phone, Birthday);
                SendEmail(registerAccount.Email, "Create Account", $"Username:{registerAccount.username}\n Password:{password}");
                return true;
            }
            catch
            {
                return false;
            }
        }

        public AccountDTO Login(LoginDTO loginDTO)
        {
            var Login =  databaseContext.Accounts.FirstOrDefault(d => d.Email == loginDTO.Indentifier || d.username == loginDTO.Indentifier);
            if (Login != null && BCrypt.Net.BCrypt.Verify(loginDTO.Password, Login.password))
            {
                var user = new AccountDTO
                {
                    Id = Login.Id,
                    FullName = Login.FullName,
                    Email = Login.Email,
                    Username = Login.username,
                    Phone = Login.Phone,
                    Birthday = Login.Birthday,
                    Role = Login.AccountType switch
                    {
                        1 => "Admin",
                        2 => "User",
                        3 => "SuperAdmin"
                    },
                    Avatar= configuration["ImageUrl"]+Login.Avatar,
                };
                return user;
            }
            else
            {
                return null;
            }
        }

        //    public DateTime? Forget(string Email)
        //    {
        //        try
        //        {
        //            var EmailParameter = new SqlParameter("@Email", Email);
        //            Random random = new Random();
        //            int Otp = random.Next(1000, 10000);
        //            var OTPParameter = new SqlParameter("@OTP", Otp);
        //           var createdOtp=databaseContext.Accounts.FromSqlRaw("EXEC sp_ForgetPassword @OTP,@Email",OTPParameter,EmailParameter).AsEnumerable().FirstOrDefault();
        //            SendEmail(Email, "Send OTP", $"OTP:{Otp}");
        //            return createdOtp?.CreatedOtp;
        //        }
        //        catch
        //        {
        //            return null;
        //        }
        //    }

        //    public bool CheckOtp(OTPDTO oTPDTO)
        //    {
        //        try
        //        {
        //            var EmailParameter=new SqlParameter("@Email",oTPDTO.Email);
        //            var OtpParameter=new SqlParameter("@OTP",oTPDTO.OTP);
        //           var result= databaseContext.Database.ExecuteSqlRaw("EXEC Check_OTP @Email,@OTP", EmailParameter, OtpParameter);
        //            return result > 0;
        //        }
        //        catch
        //        {
        //            return false;
        //        }
        //    }

        //    public bool ChangePassword(ChangePassDTP changePassDTP)
        //    {
        //        try
        //        {
        //            var PasswordParameter=new SqlParameter("@Password", BCrypt.Net.BCrypt.HashPassword(changePassDTP.NewPassword));
        //            var EmailParameter = new SqlParameter("@Email", changePassDTP.Email);
        //            databaseContext.Database.ExecuteSqlRaw("EXEC Change_Password @Password,@Email",PasswordParameter, EmailParameter);
        //            return true ;
        //        }
        //        catch { 
        //        return false;
        //        }
        //    }



        public Account GetProfileUser(int id)
        {
            var UserProfile = databaseContext.Accounts.FromSqlRaw("EXEC ProfileUser @Id={0}", id).AsEnumerable().Select(d => new Account
            {
                Id = d.Id,
                username = d.username,
                Phone = d.Phone,
                Birthday = d.Birthday,
                Avatar =configuration["ImageUrl"]+ d.Avatar,
                Email = d.Email,
                FullName = d.FullName
            }).FirstOrDefault();
            return UserProfile;
        }
        public void DeletePhoto(string photo)
        {
            try
            {
                string path = Path.Combine(webHostEnvironment.WebRootPath, "Images", photo);
                if(File.Exists(path))
                {
                    File.Delete(path);
                }
            }catch (Exception ex)
            {
                Console.WriteLine($"Error deleting file '{photo}': {ex.Message}");
            }
        }

        public bool UpdateAvatar(int id,UploadPhotoDTO uploadPhotoDTO)
        {
            var avatar = databaseContext.Accounts.FromSqlRaw("Select dbo.GetAvatarAccountId({0}) As Avatar", id).Select(a=>a.Avatar).FirstOrDefault();
            if(avatar== "defaultImage.jpg")
            {
                var fileName=FileHelper.GenerateFileName(uploadPhotoDTO.photo.FileName);
                var path = Path.Combine(webHostEnvironment.WebRootPath, "Images", fileName);
                using (var fileStream = new FileStream(path, FileMode.Create))
                {
                    uploadPhotoDTO.photo.CopyTo(fileStream);
                }
                var sql = "EXEC ChangeAvatar @Id,@Avatar";
                var paramaters = new[]
                {
                    new SqlParameter("@Id",id),
                    new SqlParameter("@Avatar",fileName)
                };
                databaseContext.Database.ExecuteSqlRaw(sql, paramaters);

            }
            else
            {
                DeletePhoto(avatar);
                var fileName = FileHelper.GenerateFileName(uploadPhotoDTO.photo.FileName);
                var path = Path.Combine(webHostEnvironment.WebRootPath, "Images", fileName);
                using (var fileStream = new FileStream(path, FileMode.Create))
                {
                    uploadPhotoDTO.photo.CopyTo(fileStream);
                }
                var sql = "EXEC ChangeAvatar @Id,@Avatar";
                var paramaters = new[]
                {
                    new SqlParameter("@Id",id),
                    new SqlParameter("@Avatar",fileName)
                };
                databaseContext.Database.ExecuteSqlRaw(sql, paramaters);
            }
            return true;
        }

        public bool ChangeProfile(int id, UpdateProfileDTO updateProfileDTO)
        {
            try
            {
                var Sql = "Exec UpdateProfile @Id,@Username,@Email,@Phone,@FullName,@Birthday";
                var parameters = new[]
                {
                    new SqlParameter ("@Id",id),
                    new SqlParameter ("@Username",updateProfileDTO.Username),
                    new SqlParameter ("@Email",updateProfileDTO.Email),
                    new SqlParameter ("@Phone",updateProfileDTO.Phone),
                    new SqlParameter ("@FullName",updateProfileDTO.FullName),
                    new SqlParameter ("@Birthday",updateProfileDTO.Birthday)
                };
                databaseContext.Database.ExecuteSqlRaw(Sql, parameters);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public dynamic GetAdmin()
        {
            return databaseContext.Accounts.FromSqlRaw("Select * From GetAdmin").Select(d => new
            {
                id=d.Id,
                Username=d.username,
            }).ToList();
        }
    }
}
