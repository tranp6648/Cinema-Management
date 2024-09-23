using CinameManageMent.Data;
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
        public AccountServiceImpl(DatabaseContext databaseContext)
        {
            this.databaseContext = databaseContext;
        }
        private void SendEmail(string to,string subject,string body)
        {
            using(var client=new SmtpClient("smtp.gmail.com"))
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
            char[]StringChars=new char[length];
            for(int i = 0; i < length;i++)
            {
                int randomIndex=random.Next(chars.Length);
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
                var Username=new SqlParameter("@Username",registerAccount.FullName);    
                var Email=new SqlParameter("@Email",registerAccount.Email);
                var Password = new SqlParameter("@Password",BCrypt.Net.BCrypt.HashPassword(password));
                var Phone = new SqlParameter("@Phone", registerAccount.Phone);
                var Birthday = new SqlParameter("@Birthday", registerAccount.Birthday);
                databaseContext.Database.ExecuteSqlRaw("EXEC sp_RegisterAccount @FullName,@Username,@Email,@Password,@Phone,@Birthday", Fullname, Username, Email, Password, Phone, Birthday);
                SendEmail(registerAccount.Email, "Create Account", $"Username:{registerAccount.username}\n Password:{Password}");
                return true;
            }
            catch
            {
                return false;
            }
        }

        public DateTime? Forget(string Email)
        {
            try
            {
                var EmailParameter = new SqlParameter("@Email", Email);
                Random random = new Random();
                int Otp = random.Next(1000, 10000);
                var OTPParameter = new SqlParameter("@OTP", Otp);
               var createdOtp=databaseContext.Accounts.FromSqlRaw("EXEC sp_ForgetPassword @OTP,@Email",OTPParameter,EmailParameter).AsEnumerable().FirstOrDefault();
                SendEmail(Email, "Send OTP", $"OTP:{Otp}");
                return createdOtp?.CreatedOtp;
            }
            catch
            {
                return null;
            }
        }

        public bool CheckOtp(OTPDTO oTPDTO)
        {
            try
            {
                var EmailParameter=new SqlParameter("@Email",oTPDTO.Email);
                var OtpParameter=new SqlParameter("@OTP",oTPDTO.OTP);
               var result= databaseContext.Database.ExecuteSqlRaw("EXEC Check_OTP @Email,@OTP", EmailParameter, OtpParameter);
                return result > 0;
            }
            catch
            {
                return false;
            }
        }

        public bool ChangePassword(ChangePassDTP changePassDTP)
        {
            try
            {
                var PasswordParameter=new SqlParameter("@Password", BCrypt.Net.BCrypt.HashPassword(changePassDTP.NewPassword));
                var EmailParameter = new SqlParameter("@Email", changePassDTP.Email);
                databaseContext.Database.ExecuteSqlRaw("EXEC Change_Password @Password,@Email",PasswordParameter, EmailParameter);
                return true ;
            }
            catch { 
            return false;
            }
        }

        public async Task<Account> Login(LoginDTO loginDTO)
        {
            var Login = await databaseContext.Accounts.FirstOrDefaultAsync(d => d.Email == loginDTO.Indentifier || d.Username == loginDTO.Indentifier);
            if (Login != null && BCrypt.Net.BCrypt.Verify(loginDTO.Password, Login.Password))
            {
                var Account = new Account
                {
                    Id = Login.Id,
                    FullName = Login.FullName,
                    Email = Login.Email,
                    AccountType = Login.AccountType,
                    Username = Login.Username,
                    Phone = Login.Phone,
                    Birthday = Login.Birthday,
                };
                return Account;
            }
            else {
                return null;
            }
        }
    }
}
