using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CinameManageMent.Models
{
    [Table("Actor")]
    public class Actor
    {
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int id { get; set; }
        [Required]
        [Column(TypeName ="Varchar(200)")]
        public string Name { get; set; }
        [Required]
        [Column(TypeName ="Varchar(100)")]
        public string Nationality {  get; set; }
        [Required]
        [Column(TypeName ="Varchar(200)")]
        public string Image { get; set; }
        [Required]
        [Column(TypeName ="Date")]
        public DateOnly Birthday { get; set; }
        [Required]
        [Column(TypeName ="text")]
        public string Bio { get; set; }

    }
}
