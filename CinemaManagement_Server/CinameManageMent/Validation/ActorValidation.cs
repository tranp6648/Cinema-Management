using System;
using System.ComponentModel.DataAnnotations;

namespace CinameManageMent.Validation
{
    public class ActorValidation : ValidationAttribute
    {
        public enum ValidationType
        {
            Name,
            Nationally,
            Image,
            Bio,
            Birthday
        }

        private readonly ValidationType validationType;

        public ActorValidation(ValidationType validationType)
        {
            this.validationType = validationType;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value == null || string.IsNullOrWhiteSpace(value.ToString()))
            {
                var fieldName = validationContext.DisplayName;

                if (validationType == ValidationType.Birthday)
                {
                    return new ValidationResult("Birthday is required.");
                }

                return new ValidationResult($"{fieldName} is required.");
            }

            return ValidationResult.Success;
        }
    }
}
