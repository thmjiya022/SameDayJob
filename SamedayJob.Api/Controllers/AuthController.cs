using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SamedayJob.Api.DTOs.AuthDto;
using SamedayJob.Api.Data;
using Microsoft.IdentityModel.Tokens;
using SamedayJob.Api.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SamedayJob.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;

    public AuthController(AppDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto registrationData)
    {
        bool emailExists = await _context.Users.AnyAsync(
            user => user.Email == registrationData.Email
        );

        if (emailExists){
            return BadRequest("Email already exists.");
        }

        var user = new User
        {
            Name = registrationData.Name,
            Email = registrationData.Email,
            PhoneNumber = registrationData.PhoneNumber,
            Password = BCrypt.Net.BCrypt.HashPassword(registrationData.Password),
            Role = "User"
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok("Registration successful");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto loginData)
    {
        var existingUser = await _context.Users.SingleOrDefaultAsync(
            user => user.Email == loginData.Email
        );

        bool isPasswordValid = existingUser != null && BCrypt.Net.BCrypt.Verify(
            loginData.Password, existingUser.Password
        );

        if(!isPasswordValid){
            return Unauthorized("Invalid credentials.");
        }

        var jwtToken = GenerateJwtToken(existingUser);

        return Ok(new 
        {
            token = jwtToken,
            user = new {
                existingUser.UserID,
                existingUser.Name,
                existingUser.Email,
                existingUser.PhoneNumber,
                existingUser.Role
            }
        });
    }

    private string GenerateJwtToken(User user)
    {
        var jwtSettings = _configuration.GetSection("Jwt");

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim("userId", user.UserID.ToString()),
            new Claim(ClaimTypes.Role, user.Role),
            new Claim("name", user.Name)
        };

        var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]));
        var creds = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: jwtSettings["Issuer"],
            audience: jwtSettings["Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(jwtSettings["ExpireMinutes"])),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}

