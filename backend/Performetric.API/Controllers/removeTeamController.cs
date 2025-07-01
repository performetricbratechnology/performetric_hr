using Microsoft.AspNetCore.Mvc;
using Performetric.API.Services;
using Performetric.API.DTOs;
using Performetric.API.Interfaces;

using System.Threading.Tasks;

namespace Performetric.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class removeTeamController : ControllerBase
{
    private readonly RemoveUserService _service;

    public removeTeamController(RemoveUserService service)
    {
        Console.WriteLine("hi");
        Console.WriteLine("hi");

        _service = service;
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> RemoveTeam(string id)
    {
        if (!Guid.TryParse(id, out _))
        {
            return BadRequest("Invalid team ID format.");
        }

        if (string.IsNullOrEmpty(id))
        {
            return BadRequest("Team ID is required.");
        }

        var result = await _service.RemoveTeamAsync(id);

        if (!result)
        {
            return NotFound("Team not found or could not be removed.");
        }

        return Ok(new { message = "Team removed successfully." });
    }

}
