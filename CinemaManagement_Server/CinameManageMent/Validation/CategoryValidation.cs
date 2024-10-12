using System.ComponentModel.DataAnnotations;

namespace CinameManageMent.Validation
{
    public class CategoryValidation : ValidationAttribute
    {
        public enum ValidationType
        {
            Name

        }
        private readonly ValidationType validationType;
        public CategoryValidation(ValidationType validationType)
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
            return ValidationResult.Success;
        }
    }
}
