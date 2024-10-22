using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CinameManageMent.Models
{
    [Table("ShowTimeSeatPrice")]
    public class ShowTimeSeatPrice
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        [Required]
        public int Id { get; set; }
        [ForeignKey("ShowTime")]
        public int showTimeId { get; set; }
        public virtual ShowTime showTime { get; set; }
        [ForeignKey("CategorySeat")]
        public int categorySeatId {  get; set; }
        public virtual CategorySeat categorySeat { get; set; }
        public decimal Price { get; set; }
    }
}
