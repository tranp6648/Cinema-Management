using CinameManageMent.Data;

namespace CinameManageMent.Services
{
    public interface ComboItemService
    {
        public bool AddCombo(AddCombo addCombo);
        public dynamic GetComboItem();
        public bool UpdateCombo(int id,UpdateCombo updateCombo);
    }
}
