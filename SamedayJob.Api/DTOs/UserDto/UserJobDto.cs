namespace SamedayJob.Api.DTOs.UserDto;

public class UserJobDto
{
    public int JobID { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public DateTime PostedAt { get; set; }
}