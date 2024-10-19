using CinameManageMent.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

[Table("Screen")]
public class Screen
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    [Required]
    public int Id { get; set; }

    [Required]
    [Column(TypeName = "nvarchar(100)")]
    public string Name { get; set; }
    [ForeignKey("Cinema")]
    public int CinemaId { get; set; }
    public virtual Cinema Cinema { get; set; }


    [Required]
    public int Capacity { get; set; }
}
