using System;
using System.Collections.Generic;

namespace CinameManageMent.Models;

public partial class Movie
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public DateOnly ReleaseDate { get; set; }

    public int Duration { get; set; }

    public string Director { get; set; } = null!;

    public string Trailer { get; set; } = null!;

    public string Picture { get; set; } = null!;

    public virtual ICollection<DetailActorMovie> DetailActorMovies { get; set; } = new List<DetailActorMovie>();

    public virtual ICollection<DetailCategoryMovie> DetailCategoryMovies { get; set; } = new List<DetailCategoryMovie>();
}
