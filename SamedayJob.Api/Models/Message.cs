namespace SamedayJob.Api.Models;

public class Message
{
    public int MessageID { get; set; }

    public int SenderID { get; set; }
    public User Sender { get; set; }

    public int ReceiverID { get; set; }
    public User Receiver { get; set; }

    public int JobID { get; set; }
    public Job Job { get; set; }

    public string Content { get; set; }
    public DateTime SentAt { get; set; }
}
