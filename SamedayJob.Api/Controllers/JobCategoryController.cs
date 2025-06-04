using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SamedayJob.Api.Data;
using SamedayJob.Api.Models;


namespace SamedayJob.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class JobCategoryController : ControllerBase
{
    private readonly AppDbContext _dbContext;

    public JobCategoryController(AppDbContext context)
    {
        _dbContext = context;
    }

    [HttpPost]
    public async Task<ActionResult> CreateJobCategory([FromBody] JobCategory category)
    {
        if (string.IsNullOrWhiteSpace(category.Name))
            return BadRequest("Category name is required.");

        var exists = await _dbContext.JobCategories.AnyAsync(c => c.Name == category.Name);
        if (exists)
            return Conflict("Category with the same name already exists.");

        _dbContext.JobCategories.Add(category);
        await _dbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(GetJobCategory), new { id = category.CategoryID }, category);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetJobCategory(int id)
    {
        var category = await _dbContext.JobCategories.FindAsync(id);
        if (category == null)
            return NotFound();

        return Ok(category);
    }


}