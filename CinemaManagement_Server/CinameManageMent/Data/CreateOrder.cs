namespace CinameManageMent.Data
{
    public class CreateOrder
    {
        public decimal TotaPrice { get; set; }
        public int idAccount { get; set; }
        public string Email { get; set; }
        public int idShowtime { get; set; }
        public List<CreateOrderTicket> Ticket { get; set; }
        public List<CreateComboOrder>? ComboOrder { get; set; }
    }
}
