using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CinameManageMent.Models
{
    [Table("Movie")]
    public class Movie
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        [Column(TypeName ="Varchar(200)")]
        public string Title { get; set; }
        [Required]
        [Column(TypeName = "ntext")]
        public string Description { get; set; }
        [Required]
        [Column(TypeName ="Date")]
        public DateOnly ReleaseDate { get; set; }
        [Required]
        public int Duration { get; set; }
        [Required]
        [Column(TypeName ="Nvarchar(200)")]
        public string Director { get; set; }
        [Required]
        [Column(TypeName ="varchar(200)")]
        public string Trailer { get; set; }
        [Required]
        [Column(TypeName ="varchar(200)")]
        public string Picture { get; set; }

    }
}
