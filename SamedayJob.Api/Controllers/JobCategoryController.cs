using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SamedayJob.Api.Data;
using SamedayJob.Api.DTOs.JobCategoryDtos;
using SamedayJob.Api.Models;

namespace SamedayJob.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class JobCategoriesController : ControllerBase
{
    private readonly AppDbContext _context;

    public JobCategoriesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<JobCategoryDto>>> GetAll()
    {
        var categories = await _context.JobCategories.ToListAsync();
        return categories.Select(ConvertToJobCategoryDto).ToList();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<JobCategoryDetailsDto>> GetById(int id)
    {
        var category = await _context.JobCategories
            .Include(c => c.Jobs)
            .FirstOrDefaultAsync(c => c.CategoryID == id);

        if (category == null)
            return NotFound();

        return ConvertToJobCategoryDetailsDto(category);
    }

    [HttpPost]
    public async Task<ActionResult<JobCategoryDetailsDto>> Create([FromBody] CreateJobCategoryRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
            return BadRequest("Category name is required.");

        var exists = await _context.JobCategories.AnyAsync(c => c.Name == request.Name);
        if (exists)
            return Conflict("Category with the same name already exists.");

        var category = new JobCategory
        {
            Name = request.Name.Trim()
        };

        _context.JobCategories.Add(category);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), 
            new { id = category.CategoryID }, 
            ConvertToJobCategoryDetailsDto(category));
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<JobCategoryDetailsDto>> Update(int id, [FromBody] UpdateJobCategoryRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
            return BadRequest("Category name is required.");

        var category = await _context.JobCategories.FindAsync(id);
        if (category == null)
            return NotFound();

        var nameExists = await _context.JobCategories
            .AnyAsync(c => c.Name == request.Name && c.CategoryID != id);
        if (nameExists)
            return Conflict("Category with the same name already exists.");

        category.Name = request.Name.Trim();
        await _context.SaveChangesAsync();

        return Ok(ConvertToJobCategoryDetailsDto(category));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var category = await _context.JobCategories.FindAsync(id);
        if (category == null)
            return NotFound();

        var hasJobs = await _context.Jobs.AnyAsync(j => j.CategoryID == id);
        if (hasJobs)
            return BadRequest("Cannot delete category that has associated jobs.");

        _context.JobCategories.Remove(category);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private JobCategoryDto ConvertToJobCategoryDto(JobCategory category)
    {
        return new JobCategoryDto
        {
            Id = category.CategoryID,
            Name = category.Name
        };
    }

    private JobCategoryDetailsDto ConvertToJobCategoryDetailsDto(JobCategory category)
    {
        return new JobCategoryDetailsDto
        {
            Id = category.CategoryID,
            Name = category.Name,
            JobCount = category.Jobs?.Count ?? 0
        };
    }
}