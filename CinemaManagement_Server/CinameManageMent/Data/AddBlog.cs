namespace CinameManageMent.Data
{
    public class AddBlog
    {
        public string Title { get; set; }
        public int idAccountCreated { get; set; }
        public int idCategoryBlog { get; set; }
        public IFormFile ImageUrl { get; set; }
        public string ContentBlog { get; set; }
    }
}
