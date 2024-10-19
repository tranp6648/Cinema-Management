using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CinameManageMent.Models
{
    [Table("CategorySeat")]
    public class CategorySeat
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        [Column(TypeName ="nvarchar(50)")]
        public string Name { get; set; }
    }
}
