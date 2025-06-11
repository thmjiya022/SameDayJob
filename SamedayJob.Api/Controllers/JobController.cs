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
    public async Task<ActionResult<IEnumerable<JobResponseDto>>> GetAllJobsAsync()
    {
        var jobs = await _dbContext.Jobs
            .Include(j => j.Category)
            .Include(j => j.Client)
            .ToListAsync();

        return jobs.Select(j => MapToJobResponseDto(j)).ToList();
    }

    [HttpGet("{id}", Name = "GetJobById")]
    public async Task<ActionResult<JobResponseDto>> GetJobDetailsAsync(int id)
    {
        var job = await _dbContext.Jobs
            .Include(j => j.Category)
            .Include(j => j.Client)
            .Include(j => j.JobRequests).ThenInclude(jr => jr.Worker)
            .Include(j => j.Reviews).ThenInclude(r => r.FromUser)
            .Include(j => j.Assignment).ThenInclude(a => a.Worker)
            .FirstOrDefaultAsync(j => j.JobID == id);

        if (job == null)
        {
            return NotFound();
        }

        return MapToJobResponseDto(job);
    }

    [HttpPost]
    public async Task<ActionResult<JobResponseDto>> CreateJobAsync(JobCreateDto jobCreateDto)
    {
        if (!decimal.TryParse(jobCreateDto.Budget, out var parsedBudget))
        {
            return BadRequest("Invalid budget value.");
        }

        var job = new Job
        {
            Title = jobCreateDto.Title,
            Description = jobCreateDto.Description,
            Budget = parsedBudget,
            Location = jobCreateDto.Location,
            CategoryID = jobCreateDto.CategoryID,
            PostedBy = jobCreateDto.PostedBy,
            PostedAt = DateTime.UtcNow,
            Status = "Open"
        };

        _dbContext.Jobs.Add(job);
        await _dbContext.SaveChangesAsync();

        await _dbContext.Entry(job)
            .Reference(j => j.Category)
            .LoadAsync();
            
        await _dbContext.Entry(job)
            .Reference(j => j.Client)
            .LoadAsync();

        return CreatedAtRoute("GetJobById", new { id = job.JobID }, MapToJobResponseDto(job));
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<JobResponseDto>> UpdateJobAsync(int id, JobUpdateDto jobUpdateDto)
    {
        var job = await _dbContext.Jobs.FindAsync(id);

        if (job == null)
        {
            return NotFound();
        }

        if (!decimal.TryParse(jobUpdateDto.Budget, out var parsedBudget))
        {
            return BadRequest("Invalid budget value.");
        }

        job.Title = jobUpdateDto.Title;
        job.Description = jobUpdateDto.Description;
        job.Budget = parsedBudget;
        job.Location = jobUpdateDto.Location;
        job.CategoryID = jobUpdateDto.CategoryID;

        await _dbContext.SaveChangesAsync();

        await _dbContext.Entry(job)
            .Reference(j => j.Category)
            .LoadAsync();
            
        await _dbContext.Entry(job)
            .Reference(j => j.Client)
            .LoadAsync();

        return Ok(MapToJobResponseDto(job));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteJobAsync(int id)
    {
        var job = await _dbContext.Jobs.FindAsync(id);

        if (job == null)
        {
            return NotFound();
        }

        _dbContext.Jobs.Remove(job);
        await _dbContext.SaveChangesAsync();

        return NoContent();
    }

    private JobResponseDto MapToJobResponseDto(Job job)
    {
        return new JobResponseDto
        {
            JobID = job.JobID,
            Title = job.Title,
            Description = job.Description,
            Budget = job.Budget,
            Location = job.Location,
            Status = job.Status,
            PostedAt = job.PostedAt,
            PostedBy = new PostedByDto
            {
                UserID = job.Client.UserID,
                Name = job.Client.Name,
                Email = job.Client.Email,
                PhoneNumber = job.Client.PhoneNumber
            },
            Category = new JobCategoryDto
            {
                CategoryID = job.Category.CategoryID,
                Name = job.Category.Name
            },
            JobRequests = job.JobRequests?.Select(jr => new JobRequestDto
            {
                JobRequestID = jr.JobRequestID,
                WorkerID = jr.WorkerID,
                WorkerName = jr.Worker.Name,
                Message = jr.Message,
                BidAmount = jr.BidAmount,
                Status = jr.Status
            }).ToList() ?? new List<JobRequestDto>(),
            Reviews = job.Reviews?.Select(r => new ReviewDto
            {
                ReviewID = r.ReviewID,
                FromUserID = r.FromUserID,
                FromUserName = r.FromUser.Name,
                Rating = r.Rating,
                Comment = r.Comment,
                CreatedAt = r.Job.PostedAt
            }).ToList() ?? new List<ReviewDto>(),
            Assignment = job.Assignment != null ? new JobAssignmentDto
            {
                JobAssignmentId = job.Assignment.JobAssignmentId,
                WorkerId = job.Assignment.WorkerId,
                WorkerName = job.Assignment.Worker.Name,
                AssignedAt = job.Assignment.AssignedAt
            } : null
        };
    }
}