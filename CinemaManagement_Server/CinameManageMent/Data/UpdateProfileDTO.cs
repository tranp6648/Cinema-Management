namespace CinameManageMent.Data
{
    public class UpdateProfileDTO
    {
        public string Username {  get; set; }
        public string Email { get; set; }
        public string Phone {  get; set; }
        public string FullName { get; set; }
        public DateOnly Birthday { get; set; }
    }
}
