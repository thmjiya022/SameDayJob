using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SamedayJob.Api.Data;
using SamedayJob.Api.DTOs.UserDto;
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
    public async Task<ActionResult<IEnumerable<UserResponseDto>>> GetUsersAsync()
    {
        var users = await _dbContext.Users.ToListAsync();
        return users.Select(u => MapToUserResponseDto(u)).ToList();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UserResponseDto>> GetUserByIdAsync(int id)
    {
        var user = await _dbContext.Users
            .Include(u => u.PostedJobs)
            .Include(u => u.Tools)
            .FirstOrDefaultAsync(u => u.UserID == id);

        if (user == null) 
        {
            return NotFound();
        }

        return MapToUserResponseDto(user);
    }

    [HttpPost]
    public async Task<ActionResult<UserResponseDto>> CreateUserAsync(UserCreateDto newUserDto)
    {
        var user = new User
        {
            Name = newUserDto.Name,
            Email = newUserDto.Email,
            PhoneNumber = newUserDto.PhoneNumber,
            Password = newUserDto.Password,
            Role = newUserDto.Role
        };

        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(GetUserByIdAsync), 
            new { id = user.UserID }, 
            MapToUserResponseDto(user));
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<UserResponseDto>> UpdateUserAsync(int id, UserUpdateDto updatedUserDto)
    {
        var user = await _dbContext.Users.FindAsync(id);

        if (user == null)
        {
            return NotFound();
        }

        user.Name = updatedUserDto.Name;
        user.Email = updatedUserDto.Email;
        user.PhoneNumber = updatedUserDto.PhoneNumber;
        user.Role = updatedUserDto.Role;

        if (!string.IsNullOrEmpty(updatedUserDto.Password))
        {
            user.Password = updatedUserDto.Password;
        }

        await _dbContext.SaveChangesAsync();

        return Ok(MapToUserResponseDto(user));
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

    private UserResponseDto MapToUserResponseDto(User user)
    {
        return new UserResponseDto
        {
            UserID = user.UserID,
            Name = user.Name,
            Email = user.Email,
            PhoneNumber = user.PhoneNumber,
            Role = user.Role,
            Rating = user.Rating,
            CreatedAt = user.CreatedAt,
            PostedJobs = user.PostedJobs?.Select(j => new UserJobDto
            {
                JobID = j.JobID,
                Title = j.Title,
                Status = j.Status,
                PostedAt = j.PostedAt
            }).ToList() ?? new List<UserJobDto>(),
            Tools = user.Tools?.Select(t => new EquipmentDto
            {
                EquipmentID = t.EquipmentID,
                Name = t.Name,
                DailyPrice = t.DailyPrice,
                IsAvailable = t.IsAvailable
            }).ToList() ?? new List<EquipmentDto>()
        };
    }
}