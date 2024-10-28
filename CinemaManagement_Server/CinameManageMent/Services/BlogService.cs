using CinameManageMent.Data;

namespace CinameManageMent.Services
{
    public interface BlogService
    {
        public bool CreateBlog(AddBlog blog);
        public dynamic GetBlog();
        public dynamic GetBlogStatus();
        public dynamic DetailBlog(int id);
        public bool UpdateStatus(int id,UpdateStatus status);
        public bool Updateblog(int id,UpdateBlog blog);
        public int CountBlog();
        public bool UpdateDescriptionMovie(int id, UpdateDescription updateDescription);
    }
}
