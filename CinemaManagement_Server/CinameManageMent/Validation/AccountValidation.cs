using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace CinameManageMent.Validation
{
    public class AccountValidation:ValidationAttribute
    {
        public enum ValidationType
        {
            Email,
            Phone,
            FullName,
            Username,
            Birthday

        }
        private readonly ValidationType validationType;
        public AccountValidation(ValidationType validationType)
        {
            this.validationType = validationType;
        }
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (string.IsNullOrWhiteSpace(value?.ToString()))
            {
                var fieldName = validationContext.DisplayName;
                return new ValidationResult(ErrorMessage ?? $"{fieldName} Is Required");
            }
            var input=value.ToString();
            switch(validationType)
            {
                case ValidationType.Email:
                    if(!new EmailAddressAttribute().IsValid(input))
                    {
                        return new ValidationResult("Invalid Email Format");
                    }
                    break;
                case ValidationType.Phone:
                    var phoneRegex = new Regex(@"^\+?[0-9\s]{7,15}$");
                    if(!phoneRegex.IsMatch(input))
                    {
                        return new ValidationResult("Invalid Phone Number Format");
                    }
                    break;
            }
            return ValidationResult.Success;
        }
    }
}
