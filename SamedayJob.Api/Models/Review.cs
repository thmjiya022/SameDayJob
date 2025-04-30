namespace SamedayJob.Api.Models;

public class Review
{
    public int ReviewID { get; set; }

    public int FromUserID { get; set; }
    public User FromUser { get; set; }

    public int ToUserID { get; set; }
    public User ToUser { get; set; }

    public int JobID { get; set; }
    public Job Job { get; set; }

    public int Rating { get; set; }
    public string Comment { get; set; }
}
