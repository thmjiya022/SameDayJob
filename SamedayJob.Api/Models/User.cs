namespace SamedayJob.Api.Models;

public class User
{
    public int Id {get; set;}
    public string Email {get; set;}
    public string PasswordHash { get; set; }
    public string PhoneNumber { get; set; }
    public bool IsPhoneNumberVerified { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
