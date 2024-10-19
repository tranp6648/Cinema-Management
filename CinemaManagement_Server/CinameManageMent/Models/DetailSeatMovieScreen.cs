using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CinameManageMent.Models
{
    public class DetailSeatMovieScreen
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        [Required]
        public int Id { get; set; }
        [ForeignKey("Screen")]
        public int idScreen { get; set; }
        public virtual Screen Screen { get; set; }
        [ForeignKey(nameof(CategorySeat))]
        public int idCategorySeat { get; set; }
        public virtual CategorySeat CategorySeat { get;set; }

    }
}
