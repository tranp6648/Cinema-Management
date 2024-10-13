using CinameManageMent.Validation;
using System.ComponentModel.DataAnnotations;

namespace CinameManageMent.Data
{
    public class RegisterAccount
    {
        [AccountValidation(AccountValidation.ValidationType.FullName)]
        public string FullName {  get; set; }
        [AccountValidation(AccountValidation.ValidationType.Email)]
      
        public string Email { get; set; }
        [AccountValidation(AccountValidation.ValidationType.Phone)]

        public string Phone { get; set; }
   
        public DateOnly Birthday { get; set; }
        [AccountValidation(AccountValidation.ValidationType.Username)]
        public string username { get; set; }
        public int AccountType { get; set; }
    }
}
