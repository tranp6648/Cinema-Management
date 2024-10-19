using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CinameManageMent.Models
{
    public class ComboItem
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        [Required]
        public int id { get; set; }
        [ForeignKey("Combo")]
        public int idCombo { get; set; }
        public virtual Combo Combo { get; set; }
        [ForeignKey("Item")]
        public int idItem { get; set; }
        public virtual Item Item { get; set; }
        [Required]
        public int Quantity { get; set; }

    }
}
