using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CinameManageMent.Models
{
    [Table("Detail_Actor_Movie")]
    public class Detail_Actor_Movie
    {
        [Required]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [ForeignKey("Actor")]
        public int idActor { get; set; }
        public virtual Actor Actor { get; set; }
        [Required]
        [ForeignKey("Movie")]
        public int idMovie { get; set; }
        public virtual Movie Movie { get; set;}
        
        [Column(TypeName ="varchar(100)")]
        public string? Role { get; set; }
    }
}
