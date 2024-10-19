using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CinameManageMent.Models
{
    public class Combo
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        [Required]
        public int id { get; set; }
        [Required]
        public string name { get; set; }
        [Required]
        public double price { get; set; }
        [Required]
        [Column(TypeName ="varchar(200)")]
        public string banner { get; set; }
    }
}
