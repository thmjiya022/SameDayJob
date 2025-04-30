namespace SamedayJob.Api.Models;

public class User
{
    public int UserID { get; set; }
    public string Name { get; set; }
    public string PhoneNumber { get; set; }
    public string Email {get; set;}
    public string Password { get; set; }
    public string Role { get; set; }
    public double Rating { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;  // ADDED

    public List<Job> PostedJobs { get; set; }
    public List<JobRequest> JobRequests { get; set; }
    public List<Review> GivenReviews { get; set; }
    public List<Review> ReceivedReviews { get; set; }
    public List<Message> SentMessages { get; set; }
    public List<Message> ReceivedMessages { get; set; }
    public List<Equipment> Tools { get; set; }
}