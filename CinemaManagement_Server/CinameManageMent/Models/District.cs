using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CinameManageMent.Models
{
    [Table("District")]
    public class District
    {
        [Required]
        [Key]   
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        [Required]
        [Column(TypeName ="nvarchar(100)")]
        public string name { get; set; }
    }
}
