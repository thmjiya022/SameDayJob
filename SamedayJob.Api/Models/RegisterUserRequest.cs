using System.ComponentModel.DataAnnotations;

namespace SamedayJob.Api.Models;

public class RegisterUserRequest
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [MinLength(6, ErrorMessage = "Password must be at least 6 characters.")]
    public string Password { get; set; }
}