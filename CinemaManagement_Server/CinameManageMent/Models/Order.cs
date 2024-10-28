using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CinameManageMent.Models
{
    [Table("Order")]
    public class Order
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }
        public string OrderCode { get; set; }
        public decimal TotalPrice { get; set; }
        [ForeignKey("Account")]
        public int IdAccount { get; set; }
        public virtual Account Account { get; set; }
        [ForeignKey("ShowTime")]
        public int ShowTimeId { get; set; }
        public virtual ShowTime ShowTime { get; set; }
        public DateTime OrderDate { get; set; }
        public int status { get; set; }
    }
}
