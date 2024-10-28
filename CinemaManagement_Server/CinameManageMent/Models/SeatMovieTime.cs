using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CinameManageMent.Models
{
    public class SeatMovieTime
    {
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]   
        public int Id { get; set; }
        [ForeignKey("ShowTime")]
        public int IdShowTime {  get; set; }
        public virtual ShowTime ShowTime { get; set; }
        
        public int idScreen {  get; set; }
        public int Status { get; set; }
    }
}
