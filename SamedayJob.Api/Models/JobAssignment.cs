namespace SamedayJob.Api.Models;

public class JobAssignment
{
    public int JobAssignmentId { get; set; }

    public int JobId { get; set; }
    public int WorkerId { get; set; }

    public Job Job { get; set; }
    public User Worker { get; set; }

    public DateTime AssignedAt { get; set; }
}
