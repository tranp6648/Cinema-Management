using CinameManageMent.Data;
using CinameManageMent.Models;

namespace CinameManageMent.Services
{
    public interface AccountService
    {
        public bool Register(RegisterAccount registerAccount);
        public DateTime? Forget(string Email);
        public bool ChangePassword(ChangePassDTP changePassDTP);
        public bool CheckOtp(OTPDTO oTPDTO);
        public Task<Account>Login(LoginDTO loginDTO);
    }
}
