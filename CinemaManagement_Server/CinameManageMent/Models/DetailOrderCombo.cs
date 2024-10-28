using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CinameManageMent.Models
{
    public class DetailOrderCombo
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }
        [ForeignKey("Order")]
        public int OrderId { get; set; }
        public virtual Order Order { get; set; }
        [ForeignKey("Combo")]
        public int comboid { get; set; }
        public virtual Combo combo { get; set; }
        
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}
