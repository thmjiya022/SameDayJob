using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SamedayJob.Api.Data;
using SamedayJob.Api.Models;

namespace SamedayJob.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;

    public UsersController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/Users
    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetAll()
    {
        return await _context.Users.ToListAsync();
    }

    // GET: api/Users/5
    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetById(int id)
    {
        var item = await _context.Users.FindAsync(id);

        if (item == null){
            return NotFound();
        }

        return item;
    }

    // POST: api/Users
    [HttpPost]
    public async Task<ActionResult<User>> Create(User item)
    {
        _context.Users.Add(item);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = item.UserID }, item);
    }

    // PUT: api/Users/5
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, User item)
    {
        if (id != item.UserID) return BadRequest();
        _context.Entry(item).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/Users/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await _context.Users.FindAsync(id);
        if (item == null) return NotFound();
        _context.Users.Remove(item);
        await _context.SaveChangesAsync();
        
        return NoContent();
    }
}
