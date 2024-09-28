using CinameManageMent.Data;
using CinameManageMent.Models;
using CinameManageMent.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CinameManageMent.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly AccountService _accountService;
        private readonly IConfiguration _config;
        public AccountController(AccountService accountService, IConfiguration config)
        {
            _accountService = accountService;
            _config = config;
        }
        [HttpPost("UpdateProfile/{id}")]
        [Authorize(Policy ="Admin")]
        public IActionResult UpdateProfile(int id, [FromBody]UpdateProfileDTO updateProfileDTO)
        {
            try
            {
                return Ok(new
                {
                    Message = "Update Profile Successfully",
                    result = _accountService.ChangeProfile(id, updateProfileDTO)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("UploadAvatar/{id}")]
     
        [Authorize(Policy ="Admin")]
        public IActionResult UploadAvatar(int id, [FromForm] UploadPhotoDTO uploadPhotoDTO)
        {
            try
            {
                return Ok(new
                {
                    Result=_accountService.UpdateAvatar(id, uploadPhotoDTO),
                    Message="Upload Avatar Successfully"
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("ProfileAccount/{id}")]
        [Authorize(Policy = "Admin")]
        public IActionResult ProfileAccount(int id)
        {
            try
            {
                return Ok(_accountService.GetProfileUser(id));
            }
            catch
            {
                return BadRequest();
            }
        }
        //    [HttpPost("Logout")]
        //    public async Task<IActionResult> Logout()
        //    {
        //        await HttpContext.SignOutAsync();
        //        return Ok(new { message = "Logout Successfully" });
        //    }
        private string GenerateJwtToken(AccountDTO user)
        {
                var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_config["Jwt:Secret"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
             new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim("FullName", user.FullName),
            new Claim(ClaimTypes.Role, user.Role)
        };

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        [Produces("application/json")]
        [Consumes("application/json")]
        [HttpPost("Login")]
        public IActionResult Login([FromBody] LoginDTO loginDTO)
        {
            var account =  _accountService.Login(loginDTO);
            if (account == null)
            {
                return Unauthorized();
            }
            var token = GenerateJwtToken(account);




            return Ok(new
            {
                token,
                claims = new
                {
                    account.Id,
                    account.Username,
                    account.Email,
                    account.FullName,
                    Role = account.Role,
                    account.Phone,
                    account.Birthday,
                    account.Avatar,
                },
                message = "Login Sucess"
            }) ;
        }
        //[Produces("application/json")]
        //[Consumes("application/json")]
        //[HttpPut("CheckOTP")]
        //public IActionResult CheckOTP([FromBody] OTPDTO oTPDTO)
        //{
        //    try
        //    {
        //        return Ok(_accountService.CheckOtp(oTPDTO));
        //    }
        //    catch
        //    {
        //        return BadRequest();
        //    }
        //}
        //    [HttpPut("ChangePassword")]

        //    public IActionResult ChangePassword([FromBody] ChangePassDTP changePassDTP)
        //    {

        //        try
        //        {
        //            return Ok(_accountService.ChangePassword(changePassDTP));
        //        }
        //        catch
        //        {
        //            return BadRequest();
        //        }
        //    }
        //    [HttpPut("ForgetPassword/{Email}")]
        //    public IActionResult ForgetPassword(string Email)
        //    {
        //        try
        //        {
        //            return Ok(_accountService.Forget(Email));
        //        }
        //        catch
        //        {
        //            return BadRequest();
        //        }
        //    }
        [Produces("application/json")]
        [Consumes("application/json")]
        [HttpPost("Register")]
        public IActionResult Register([FromBody] RegisterAccount registerAccount)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState
           .Where(kvp => kvp.Value.Errors.Count > 0)
           .ToDictionary(
               kvp => kvp.Key,
               kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).ToList()
           );

                return BadRequest(new { Errors = errors });
            }
            try
            {
                return Ok(_accountService.Register(registerAccount));
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
