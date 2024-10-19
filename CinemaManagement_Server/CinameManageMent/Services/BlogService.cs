using CinameManageMent.Data;

namespace CinameManageMent.Services
{
    public interface BlogService
    {
        public bool CreateBlog(AddBlog blog);
        public dynamic GetBlog();
        public bool UpdateStatus(int id,UpdateStatus status);
        public bool Updateblog(int id,UpdateBlog blog);
    }
}
