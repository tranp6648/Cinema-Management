using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CinameManageMent.Models
{
    [Table("Feedback")]
    public class Feedback
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        [Required]
        public int Id { get; set; }
        [Column(TypeName ="ntext")]
        [Required]
        public string Comment { get; set; }
        [Column(TypeName ="datetime")]
        public DateTime Feedback_Date { get; set; }
        public int RatingComment { get; set; }
        [ForeignKey(nameof(Movie))]
        public int IdMovie { get; set; }
        public virtual Movie Movie { get; set; }
        [ForeignKey(nameof(Account))]
        public int IdAccount { get; set; }
        public virtual Account Account { get; set; }
    }
}
