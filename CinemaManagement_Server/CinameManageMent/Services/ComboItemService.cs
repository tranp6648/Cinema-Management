using CinameManageMent.Data;

namespace CinameManageMent.Services
{
    public interface ComboItemService
    {
        public bool AddCombo(AddCombo addCombo);
        public dynamic GetComboItem();
        public bool UpdateCombo(int id,UpdateCombo updateCombo);
        public dynamic ShowComboItem();
        public bool UpdateStatus(int id,UpdateStatus updateStatus);
        public int CountComboItem();
    }
}
