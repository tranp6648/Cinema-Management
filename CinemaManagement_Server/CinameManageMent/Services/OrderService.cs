using CinameManageMent.Data;

namespace CinameManageMent.Services
{
    public interface OrderService
    {
        public string CreateOrder(CreateOrder createOrder);
        public dynamic GetOrderByAdmin(int id);
        public bool UpdateOrderStatus(string email,int id);
        public dynamic GetAccountDetailOrder(int id);
        public dynamic GetSeatDetailOrder(int id);
        public dynamic GetComboSeatDetail(int id);
        public int CountOrder();
        public dynamic GetCoutorder(int datetime);
        public dynamic GetCoutOrderAdmin(int datetime, int id);
        public dynamic OrderDesc();
        public bool ConfirmTransfer(string orderCode);
        public dynamic HistoryOrder(int id);
        public int CountOrderAdmin(int id);
        public dynamic SeatOrderReject(int id);
        public bool RejectOrder(int id,RejeOrder rejects);
    }
}
