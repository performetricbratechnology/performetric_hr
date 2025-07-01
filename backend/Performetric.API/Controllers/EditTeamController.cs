using Microsoft.AspNetCore.Mvc;
using Performetric.API.Services;
using Performetric.API.DTOs;
using Performetric.API.Interfaces;

using System.Threading.Tasks;

namespace Performetric.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EditTeamController : ControllerBase
{
    private readonly ITeamEdit _teamEditService;
    public EditTeamController(ITeamEdit teamEditService)
    {
        _teamEditService = teamEditService;
    }

    [HttpPatch("modify-name-team")]
    public async Task<IActionResult> ModifyName([FromBody] TeamDTO team, [FromQuery] string newNameTeam)
    {
        Console.WriteLine($"Team ID: {team?.Id}");
        Console.WriteLine($"NewName: {newNameTeam}");

        if (string.IsNullOrWhiteSpace(newNameTeam))
            return BadRequest("Nome não pode ser vazio.");

        if (team == null || team.Id == Guid.Empty)
            return BadRequest("Team inválido.");

        var result = await _teamEditService.ModifyNameTeam(team, newNameTeam);
        if (result)
            return Ok("Nome do time modificado com sucesso.");

        return StatusCode(500, "Erro ao modificar nome do time.");
    }


    [HttpPatch("modify-description-team")]
    public async Task<IActionResult> ModifyDescription([FromBody] TeamDTO team, [FromQuery] string newDescriptionTeam)
    {
        Console.WriteLine($"Team ID: {team?.Id}");
        Console.WriteLine($"New Description: {newDescriptionTeam}");

        if (string.IsNullOrWhiteSpace(newDescriptionTeam))
            return BadRequest("Description não pode ser vazio.");

        if (team == null || team.Id == Guid.Empty)
            return BadRequest("Team inválido.");

        var result = await _teamEditService.ModifyDescriptionTeam(team, newDescriptionTeam);
        if (result)
            return Ok("Descricao do time modificado com sucesso.");

        return StatusCode(500, "Erro ao modificar descricao do time.");
        
    }


}
