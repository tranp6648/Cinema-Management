using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CinameManageMent.Models
{
    public class Item
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        [Column(TypeName ="nvarchar(200)")]
        public string Name { get; set; }
        [Required]
        [Column(TypeName ="nvarchar(200)")]
        public string Category { get; set; }


    }
}
