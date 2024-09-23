using System.ComponentModel.DataAnnotations;

namespace CinameManageMent.Validation
{
    public class ChangePasswordValidation:ValidationAttribute
    {
        public enum ValidationType
        {
            NewPassword,
            ConfirmPassword
        }
        private readonly ValidationType validationType;
        public ChangePasswordValidation(ValidationType validationType)
        {
            this.validationType = validationType;
        }
        protected override ValidationResult? IsValid(object value, ValidationContext validationContext)
        {
            if (string.IsNullOrWhiteSpace(value?.ToString()))
            {
                var fieldName=validationContext.DisplayName;
                return new ValidationResult(ErrorMessage ?? $"{fieldName} Is Required");
            }
            var password=value as string;
            
            
                if (password.Length < 8)
                {
                    var fieldName = validationContext.DisplayName;
                    return new ValidationResult($"{fieldName} must be at least 8 characters long");

                }
            
            
            if(validationType == ValidationType.ConfirmPassword)
            {
                var newPasswordProperty = validationContext.ObjectType.GetProperty("NewPassword");
                var newPassword = newPasswordProperty.GetValue(validationContext.ObjectInstance) as string;
                if (newPassword != password) {
                    return new ValidationResult("Confirm password does not match the new Password.");
                }
            }
            return ValidationResult.Success;
        }
    }
}
