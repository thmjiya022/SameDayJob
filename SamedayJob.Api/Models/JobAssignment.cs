namespace SamedayJob.Api.Models;

public class JobAssignment
{
    public int AssignmentID { get; set; }

    public int JobID { get; set; }
    public Job Job { get; set; }

    public int WorkerID { get; set; }
    public User Worker { get; set; }

    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
}
