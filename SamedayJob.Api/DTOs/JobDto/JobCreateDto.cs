namespace SamedayJob.Api.DTOs.JobDto;

public class JobCreateDto
{
    public string Title { get; set; }
    public string Description { get; set; }
    public string Budget { get; set; }
    public string Location { get; set; }
    public int CategoryID { get; set; }
    public int PostedBy { get; set; }
}