namespace CinameManageMent.Data
{
    public class AddShowTime
    {
        public int idMovie {  get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int idscreen { get; set; }
        public int idAccountCreate { get; set; }
        public List<AddShowTimeSeatPrice> Seats { get; set; }
        public List<AddSeatShowTime> SeatsById { get; set; }
    }
}
