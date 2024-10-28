using CinameManageMent.Validation;

namespace CinameManageMent.Data
{
    public class UpdateActor
    {
        [ActorValidation(ActorValidation.ValidationType.Name)]
        public string Name { get; set; }
        public string Nationality { get; set; }
        public IFormFile? Image { get; set; }
 
        public DateOnly Birthday { get; set; }
    }
}
