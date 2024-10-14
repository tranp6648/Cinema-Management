using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CinameManageMent.Models;

public partial class DetailActorMovie
{
    public int Id { get; set; }
    [ForeignKey(nameof(Actor))]
    public int IdActor { get; set; }
    public virtual Actor Actor { get; set; }
    [ForeignKey(nameof(Movie))]
    public int IdMovie { get; set; }
    public virtual Movie Movie { get; set; } 
    public string? Role { get; set; }

    

   
}
