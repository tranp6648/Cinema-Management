using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CinameManageMent.Models;

public partial class Blog
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public int IdAccountCreated { get; set; }

    public int? IdAccountUpdated { get; set; }
    [ForeignKey(nameof(CategoryBlog))]
    public int IdCategoryBlog { get; set; }
    public virtual CategoryBlog CategoryBlog { get; set; }

    public string ImageUrl { get; set; } = null!;

    public bool Status { get; set; }

    public string ContentBlog { get; set; } = null!;

    
}
