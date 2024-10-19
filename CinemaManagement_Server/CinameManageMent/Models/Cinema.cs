using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CinameManageMent.Models;
[Table("Cinema")]
public  class Cinema
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    [Required]
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string District { get; set; } = null!;

    public string Address { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public int IdManager { get; set; }

    public bool Status { get; set; }
}
