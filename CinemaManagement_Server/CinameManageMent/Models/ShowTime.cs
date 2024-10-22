using Castle.Components.DictionaryAdapter;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace CinameManageMent.Models
{
    [Table("ShowTime")]
    public class ShowTime
    {
       [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [System.ComponentModel.DataAnnotations.Key]
        [Required]
        public int Id { get; set; }
        [ForeignKey("Movie")]
        public int idMovie { get; set; }
        public virtual Movie Movie { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        [ForeignKey("Screen")]
        public int IdScreen { get; set; }
        public virtual Screen Screen { get; set; }
        public int IdAccountCreate {  get; set; }

    }
}
