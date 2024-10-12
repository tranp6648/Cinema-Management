namespace CinameManageMent.Data
{
    public class AddActor
    {
        public string Name { get; set; }
        public string Nationality { get; set; }
        public IFormFile Image { get; set; }
        public string Bio { get; set; }
        public DateOnly Birthday { get; set; }

    }
}
