using CinameManageMent.Validation;
using System.ComponentModel.DataAnnotations;

namespace CinameManageMent.Data
{
    public class AddCategory
    {

        [CategoryValidation(CategoryValidation.ValidationType.Name)]
        public string Name { get; set; }
    }
}
