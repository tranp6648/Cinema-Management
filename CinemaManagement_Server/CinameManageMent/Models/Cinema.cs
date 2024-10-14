using System;
using System.Collections.Generic;

namespace CinameManageMent.Models;

public partial class Cinema
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string District { get; set; } = null!;

    public string Address { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public int IdManager { get; set; }

    public bool Status { get; set; }
}
