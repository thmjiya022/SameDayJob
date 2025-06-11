namespace SamedayJob.Api.DTOs.JobDto;

public class ReviewDto
{
    public int ReviewID { get; set; }
    public int FromUserID { get; set; }
    public string FromUserName { get; set; } = string.Empty;
    public int Rating { get; set; }
    public string Comment { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}