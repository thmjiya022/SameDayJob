using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SamedayJob.Api.Data;
using SamedayJob.Api.DTOs.JobDto;
using SamedayJob.Api.Models;

namespace SamedayJob.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class JobController : ControllerBase
{
    private readonly AppDbContext _dbContext;

    public JobController(AppDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Job>>> GetAllJobsAsync()
    {
        return await _dbContext.Jobs.ToListAsync();
    }
    
    [HttpGet("{id}", Name = "GetJobById")]
    public async Task<ActionResult<Job>> GetJobByIdAsync(int id)
    {
        var job = await _dbContext.Jobs.FindAsync(id);

        if (job == null)
        {
            return NotFound();
        }

        return job;
    }

    [HttpPost]
    public async Task<ActionResult<Job>> CreateJobAsync(JobCreateDto jobDto)
    {
        if (!decimal.TryParse(jobDto.Budget, out var budget))
        {
            return BadRequest("Invalid budget value.");
        }

        var newJob = new Job
        {
            Title = jobDto.Title,
            Description = jobDto.Description,
            Budget = budget,
            Location = jobDto.Location,
            CategoryID = jobDto.CategoryID,
            PostedBy = jobDto.PostedBy,
            PostedAt = DateTime.UtcNow,
            Status = "Open"
        };

        _dbContext.Jobs.Add(newJob);
        await _dbContext.SaveChangesAsync();

        return CreatedAtRoute("GetJobById", new { id = newJob.JobID }, newJob);
    }
}
