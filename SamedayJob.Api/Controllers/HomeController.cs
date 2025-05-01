using Microsoft.AspNetCore.Mvc;

namespace SamedayJob.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HomeController : ControllerBase
{
    [HttpGet]
    public IActionResult GetWelcomeMessage()
    {
        return Ok(new
        {
            message = "Welcome to the SameDayJob API!",
            version = "v1",
            time = DateTime.UtcNow
        });
    }
}
