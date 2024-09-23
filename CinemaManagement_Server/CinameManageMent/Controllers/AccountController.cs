using CinameManageMent.Data;
using CinameManageMent.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CinameManageMent.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly AccountService _accountService;
        public AccountController(AccountService accountService)
        {
            _accountService = accountService;
        }
        [HttpPost("Logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync();
            return Ok(new { message = "Logout Successfully" });
        }
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody]LoginDTO loginDTO)
        {
            var account=await _accountService.Login(loginDTO);
            if(account == null)
            {
                return Unauthorized();
            }
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier,account.Id.ToString()),
                new Claim(ClaimTypes.Name,account.Username),
                new Claim (ClaimTypes.Email,account.Email),
                new Claim("FullName",account.FullName),
                new Claim(ClaimTypes.Role,account.AccountType==1?"Admin":"User")
            };
            var claimsIdentity = new ClaimsIdentity(claims, "login");
            var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);

            await HttpContext.SignInAsync(claimsPrincipal);
            return Ok(account);

        }
        [Produces("application/json")]
        [Consumes("application/json")]
        [HttpPut("CheckOTP")]
        public IActionResult CheckOTP([FromBody]OTPDTO oTPDTO)
        {
            try
            {
                return Ok(_accountService.CheckOtp(oTPDTO));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut("ChangePassword")]
      
        public IActionResult ChangePassword([FromBody] ChangePassDTP changePassDTP)
        {
           
            try
            {
                return Ok(_accountService.ChangePassword(changePassDTP));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut("ForgetPassword/{Email}")]
        public IActionResult ForgetPassword(string Email)
        {
            try
            {
                return Ok(_accountService.Forget(Email));
            }
            catch
            {
                return BadRequest();
            }
        }
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

                return BadRequest(new {Errors=errors});   
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
