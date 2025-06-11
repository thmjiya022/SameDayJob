namespace SamedayJob.Api.DTOs.JobDto;

public class JobRequestDto
{
    public int JobRequestID { get; set; }
    public int WorkerID { get; set; }
    public string WorkerName { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public decimal BidAmount { get; set; }
    public string Status { get; set; } = string.Empty;
}