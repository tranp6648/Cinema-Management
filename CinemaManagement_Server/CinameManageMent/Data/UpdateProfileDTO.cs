using CinameManageMent.Validation;

namespace CinameManageMent.Data
{
    public class UpdateProfileDTO
    {
        [AccountValidation(AccountValidation.ValidationType.Username)]
        public string Username {  get; set; }
        [AccountValidation(AccountValidation.ValidationType.Email)]
        public string Email { get; set; }
        [AccountValidation(AccountValidation.ValidationType.Phone)]
        public string Phone {  get; set; }
        [AccountValidation(AccountValidation.ValidationType.FullName)]
        public string FullName { get; set; }
        public DateOnly Birthday { get; set; }
    }
}
