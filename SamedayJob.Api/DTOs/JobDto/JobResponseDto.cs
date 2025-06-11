namespace SamedayJob.Api.DTOs.JobDto;

public class JobResponseDto
{
    public int JobID { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Budget { get; set; }
    public string Location { get; set; } = string.Empty;
    public string Status { get; set; } = "Open";
    public DateTime PostedAt { get; set; }
    public PostedByDto PostedBy { get; set; }
    public JobCategoryDto Category { get; set; }
    public List<JobRequestDto> JobRequests { get; set; } = new();
    public List<ReviewDto> Reviews { get; set; } = new();
    public JobAssignmentDto? Assignment { get; set; }
}