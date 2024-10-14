using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CinameManageMent.Models;

public partial class Account
{
    public int Id { get; set; }

    public string Username { get; set; } = null!;

    public string Email { get; set; } = null!;
    [Column(TypeName ="varchar(12)")]
    public string Phone { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string FullName { get; set; } = null!;

    public DateOnly Birthday { get; set; }

    public int? AccountType { get; set; }

    public string? Otp { get; set; }

    public DateTime? CreatedOtp { get; set; }

    public string? Avatar { get; set; }

    public bool Active { get; set; }
}
