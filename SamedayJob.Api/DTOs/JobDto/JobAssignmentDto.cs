namespace SamedayJob.Api.DTOs.JobDto;

public class JobAssignmentDto
{
    public int JobAssignmentId { get; set; }
    public int WorkerId { get; set; }
    public string WorkerName { get; set; } = string.Empty;
    public DateTime AssignedAt { get; set; }
}