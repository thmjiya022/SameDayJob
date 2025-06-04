namespace SamedayJob.Api.Models;

public class JobCategory
{
    public int CategoryID { get; set; }
    public string Name { get; set; }

    // Navigation
    public List<Job>? Jobs { get; set; }
}
