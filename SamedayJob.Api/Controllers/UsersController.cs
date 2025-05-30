using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SamedayJob.Api.Data;
using SamedayJob.Api.Models;

namespace SamedayJob.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _dbContext;

    public UsersController(AppDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetUsersAsync()
    {
        return await _dbContext.Users.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUserByIdAsync(int id)
    {
        var user = await _dbContext.Users.FindAsync(id);

        if (user == null) 
        {
            return NotFound();
        }

        return user;
    }

    [HttpPost]
    public async Task<ActionResult<User>> CreateUserAsync(User newUser)
    {
        _dbContext.Users.Add(newUser);
        await _dbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(GetUserByIdAsync), new { id = newUser.UserID }, newUser);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUserAsync(int id, User updatedUser)
    {
        if (id != updatedUser.UserID) 
        {
            return BadRequest();
        }

        _dbContext.Entry(updatedUser).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUserAsync(int id)
    {
        var user = await _dbContext.Users.FindAsync(id);

        if(user == null)
        {
            return NotFound();
        }

        _dbContext.Users.Remove(user);
        await _dbContext.SaveChangesAsync();

        return NoContent();
    }
}