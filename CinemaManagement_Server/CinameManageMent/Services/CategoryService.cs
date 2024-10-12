using CinameManageMent.Data;
using CinameManageMent.Models;

namespace CinameManageMent.Services
{
    public interface CategoryService
    {
        public bool AddCategory(AddCategory category);
        public dynamic GetCategory();
        public bool UpdateCategory(int id, AddCategory addCategory);
        public bool DeleteCategory(int id); 
    }
}
