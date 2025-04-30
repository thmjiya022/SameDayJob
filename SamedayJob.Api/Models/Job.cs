namespace SamedayJob.Api.Models;

public class Job
{
    public int JobID { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public decimal Budget { get; set; }
    public string Location { get; set; }
    public string Status { get; set; }
    public DateTime PostedAt { get; set; }

    public int PostedBy { get; set; }
    public User Client { get; set; }

    public int CategoryID { get; set; }
    public JobCategory Category { get; set; }

    // Navigation
    public List<JobRequest> JobRequests { get; set; }
    public List<Review> Reviews { get; set; }
    public List<Message> Messages { get; set; }
    public JobAssignment Assignment { get; set; }
}
