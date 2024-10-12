using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CinameManageMent.Models
{
    [Table("DetailCategoryMovie")]
    public class Detail_Category_Movie
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        [ForeignKey("Category")]
        public int IdCategory { get; set; }
        public virtual Category Category { get; set; }
        [Required]
        [ForeignKey("Movie")]
        public int IdMovie { get; set; }
        public virtual Movie Movie { get; set; }

    }
}
