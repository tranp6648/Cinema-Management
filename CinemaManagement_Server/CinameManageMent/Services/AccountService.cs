using CinameManageMent.Data;
using CinameManageMent.Models;

namespace CinameManageMent.Services
{
    public interface AccountService
    {
        public bool Register(RegisterAccount registerAccount);
        //public DateTime? Forget(string Email);
        //public bool ChangePassword(ChangePassDTP changePassDTP);
        //public bool CheckOtp(OTPDTO oTPDTO);
        public AccountDTO Login(LoginDTO loginDTO);
        public Account GetProfileUser(int id);
        public bool UpdateAvatar(int id,UploadPhotoDTO uploadPhotoDTO);
        public bool ChangeProfile(int id,UpdateProfileDTO updateProfileDTO);
    }
}
