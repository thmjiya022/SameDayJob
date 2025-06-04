namespace SamedayJob.Api.Models;

public class JobRequest
{
    public int JobRequestID { get; set; }

    public int JobID { get; set; }
    public Job Job { get; set; }

    public int WorkerID { get; set; }
    public User Worker { get; set; }

    public string Message { get; set; }
    public decimal BidAmount { get; set; }
    public string Status { get; set; } 
}
