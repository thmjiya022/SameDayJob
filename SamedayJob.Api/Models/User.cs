using SamedayJob.Api.Enums;

namespace SamedayJob.Api.Models;

public class User
{
    public int UserID { get; set; }
    public string Name { get; set; }
    public string PhoneNumber { get; set; }
    public string Email {get; set;}
    public string Password { get; set; }
    public UserType Type { get; set; }
    public double Rating { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow; 

    public List<Job> PostedJobs { get; set; } = new();
    public List<JobRequest> JobRequests { get; set; } = new();
    public List<Review> GivenReviews { get; set; } = new();
    public List<Review> ReceivedReviews { get; set; } = new();
    public List<Message> SentMessages { get; set; } = new();
    public List<Message> ReceivedMessages { get; set; } = new();
    public List<Equipment> Tools { get; set; } = new();
}