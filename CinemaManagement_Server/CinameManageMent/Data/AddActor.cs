using CinameManageMent.Validation;

namespace CinameManageMent.Data
{
    public class AddActor
    {

        [ActorValidation(ActorValidation.ValidationType.Name)]
        public string Name { get; set; }
        [ActorValidation(ActorValidation.ValidationType.Nationally)]
        public string Nationality { get; set; }
        [ActorValidation(ActorValidation.ValidationType.Image)]
        public IFormFile Image { get; set; }
        [ActorValidation(ActorValidation.ValidationType.Bio)]
        public string Bio { get; set; }
        [ActorValidation(ActorValidation.ValidationType.Birthday)]
        public DateOnly Birthday { get; set; }

    }
}
