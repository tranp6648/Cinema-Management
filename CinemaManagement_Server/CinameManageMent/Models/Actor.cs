using System;
using System.Collections.Generic;

namespace CinameManageMent.Models;

public partial class Actor
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Nationality { get; set; } = null!;

    public string Image { get; set; } = null!;

    public DateOnly Birthday { get; set; }

    public string Bio { get; set; } = null!;

    public virtual ICollection<DetailActorMovie> DetailActorMovies { get; set; } = new List<DetailActorMovie>();
}
