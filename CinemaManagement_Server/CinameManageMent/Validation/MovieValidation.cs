using System.ComponentModel.DataAnnotations;

namespace CinameManageMent.Validation
{
    public class MovieValidation:ValidationAttribute
    {
        public enum ValidationType
        {
            Title,
            Desciption,
            ReleaseDate,
            Duration,
            Director,
            Category,
            Picture,
            Trailer
        }
        private readonly ValidationType validationType;
        public MovieValidation(ValidationType validationType)
        {
            this.validationType = validationType;
        }
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value == null || string.IsNullOrWhiteSpace(value.ToString()))
            {
                var fieldName = validationContext.DisplayName;

                

                return new ValidationResult($"{fieldName} is required.");
            }

            return ValidationResult.Success;
        }
    }
}
