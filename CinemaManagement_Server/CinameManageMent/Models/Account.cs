using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CinameManageMent.Models;
[Table("Account")]
public  class Account
{
    [Required]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int Id { get; set; }
    [Required]
    [Column(TypeName ="varchar(200)")]
    public string username { get; set; }
    [Required]
    [Column(TypeName ="varchar(10)")]
    public string Email { get; set; }
    [Required]
    [Column(TypeName ="varchar(12)")]
    public string Phone {  get; set; }
    [Required]
    [Column(TypeName ="varchar(200)")]
    public string password { get; set; }
    [Required]
    [Column(TypeName ="Varchar(200)")]
    public string FullName { get; set; } = null!;
    [Required]
    [Column(TypeName ="date")]
    public DateOnly Birthday { get; set; }

    public int? AccountType { get; set; }
    [Column(TypeName ="varchar(4)")]
    public string? Otp { get; set; }
    [Column(TypeName ="datetime")]
    public DateTime? CreatedOtp { get; set; }
    [Column(TypeName ="Varchar(200)")]
    public string? Avatar { get; set; }
    public bool Active { get; set; }
}
