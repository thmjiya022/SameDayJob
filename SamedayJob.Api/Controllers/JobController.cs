using Microsoft.AspNetCore.Mvc;
using SamedayJob.Api.Data;
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

    public async Task<ActionResult<Job>> GetJobByIdAsync(int id) {

        var job = await _dbContext.Jobs.FindAsync(id);

        if (job == null)
        {
            return NotFound();
        }

        return job;

    }

    public async Task<ActionResult<Job>> CreateJobAsync(Job newJob)
    {
        return CreatedAtAction(nameof(GetJobByIdAsync), new { id = newJob.JobID }, newJob);
    }
}