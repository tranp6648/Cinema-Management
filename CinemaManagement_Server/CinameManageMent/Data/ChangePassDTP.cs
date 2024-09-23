using CinameManageMent.Validation;
using System.ComponentModel.DataAnnotations;

namespace CinameManageMent.Data
{
    public class ChangePassDTP
    {
        [ChangePasswordValidation(ChangePasswordValidation.ValidationType.NewPassword)]
        public string NewPassword { get; set; }
        [ChangePasswordValidation(ChangePasswordValidation.ValidationType.ConfirmPassword)]
   
        public string ConfirmPassword { get; set; }
        public string Email { get; set; }
    }
}
