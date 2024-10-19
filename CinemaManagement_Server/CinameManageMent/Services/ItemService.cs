using CinameManageMent.Data;

namespace CinameManageMent.Services
{
    public interface ItemService
    {
        public bool CreateItem(CreateItem createItem);
        public dynamic GetItem();
    }
}
