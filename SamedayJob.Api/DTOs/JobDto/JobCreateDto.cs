namespace SamedayJob.Api.DTOs.JobDto;

public class JobCreateDto
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Budget { get; set; } = "0.00";
    public string Location { get; set; } = string.Empty;
    public int CategoryID { get; set; }
    public int PostedBy { get; set; } 
}