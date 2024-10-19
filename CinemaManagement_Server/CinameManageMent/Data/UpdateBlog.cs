namespace CinameManageMent.Data
{
    public class UpdateBlog
    {
        public string Title { get; set; }
        public IFormFile? Image { get; set; }
        public int idCategoryBlog { get; set; }
    }
}
