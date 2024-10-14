using CinameManageMent.Data;

namespace CinameManageMent.Services
{
    public interface CategoryBlogService
    {
        public bool CreateCategoryBlog(AddCategoryBlog addCategoryBlog);
        public dynamic GetCategory();
    }
}
