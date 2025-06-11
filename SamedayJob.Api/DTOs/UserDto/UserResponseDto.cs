namespace SamedayJob.Api.DTOs.UserDto;

public class UserResponseDto
{
    public int UserID { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public double Rating { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<UserJobDto> PostedJobs { get; set; } = new();
    public List<EquipmentDto> Tools { get; set; } = new();
}