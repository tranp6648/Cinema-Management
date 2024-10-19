namespace CinameManageMent.Data
{
    public class CreateSeat
    {
        public int idCinema { get; set; }
        public int Capacity { get; set; }
        public string Name { get; set; }
        public List<CreateDetailScreen> Details { get; set; }
    }
}
