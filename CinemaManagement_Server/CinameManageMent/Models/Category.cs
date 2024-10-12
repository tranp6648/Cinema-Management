using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CinameManageMent.Models
{
    [Table("Category")]
    public class Category
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        [Key]
        public int id { get; set; }
        [Required]
        [Column(TypeName ="Varchar(200)")]
        public string Name { get; set; }
    }
}
