using Microsoft.AspNetCore.Mvc;
using Performetric.API.Services;
using Performetric.API.DTOs;
using Performetric.API.Interfaces;

using System.Threading.Tasks;

namespace Performetric.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class removeSkillController : ControllerBase
{
    private readonly RemoveUserService _service;

    public removeSkillController(RemoveUserService service)
    {
        _service = service;
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> RemoveSkill(string id)
    {
        if (!Guid.TryParse(id, out _))
        {
            return BadRequest("Invalid Skill ID format.");
        }

        if (string.IsNullOrEmpty(id))
        {
            return BadRequest("Skill ID is required.");
        }

        var result = await _service.RemoveSkillAsync(id);

        if (!result)
        {
            return NotFound("Skill not found or could not be removed.");
        }

        return Ok(new { message = "Skill removed successfully." });
    }

}
