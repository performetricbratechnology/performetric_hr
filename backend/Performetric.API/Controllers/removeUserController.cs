using Microsoft.AspNetCore.Mvc;
using Performetric.API.Services;
using System.Threading.Tasks;

namespace Performetric.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class removeUserController : ControllerBase
{
    private readonly RemoveUserService _service;

    public removeUserController(RemoveUserService service)
    {
        _service = service;
    }

    [HttpDelete("{userId}")]
    public async Task<IActionResult> RemoveUser(string userId)
    {
        if (!Guid.TryParse(userId, out _))
        {
            return BadRequest("Invalid user ID format.");
        }

        if (string.IsNullOrEmpty(userId))
        {
            return BadRequest("User ID is required.");
        }

        var result = await _service.RemoveUserAsync(userId);

        if (!result)
        {
            return NotFound("User not found or could not be removed.");
        }

        return Ok(new { message = "User removed successfully." });
    }

}
