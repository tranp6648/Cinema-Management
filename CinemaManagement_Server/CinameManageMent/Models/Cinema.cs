using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CinameManageMent.Models
{
    [Table("Cinema")]
    public class Cinema
    {
       
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int id {  get; set; }
        [Column(TypeName ="Nvarchar(200)")]
        public string name { get; set; }
        [Column(TypeName ="Nvarchar(200)")]
        public string District {  get; set; }
        [Column(TypeName ="nvarchar(200)")]
        public string Address { get; set; }
        [Column(TypeName ="varchar(12)")]
        public string PhoneNumber { get; set; }
        [Required]
        public int idManager { get; set; }
        public bool status { get; set; }
    }
}
