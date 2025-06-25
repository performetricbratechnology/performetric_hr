using Microsoft.AspNetCore.Mvc;
using Performetric.API.Services;
using Performetric.API.Services.Interfaces;
using System.Threading.Tasks;

namespace Performetric.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EditUserController : ControllerBase
{
    private readonly IUserEdit _userEditService;
    public EditUserController(IUserEdit userEditService)
    {
        _userEditService = userEditService;
    }

    [HttpPatch("modify-name")]
    public async Task<IActionResult> ModifyName([FromBody] EmployeeDTO employee, [FromQuery] string newName)
    {
        if (string.IsNullOrWhiteSpace(newName))
            return BadRequest("Nome não pode ser vazio.");

        var result = await _userEditService.ModifyNameEmployee(employee, newName);
        if (result)
            return Ok("Nome modificado com sucesso.");

        return StatusCode(500, "Erro ao modificar nome.");
    }

    [HttpPatch("modify-position")]
    public async Task<IActionResult> ModifyPosition([FromBody] EmployeeDTO employee, [FromQuery] string newPosition)
    {
        if (string.IsNullOrWhiteSpace(newPosition))
            return BadRequest("Posição não pode ser vazia.");

        var result = await _userEditService.ModifyPositionEmployee(employee, newPosition);
        if (result)
            return Ok("Posição modificada com sucesso.");

        return StatusCode(500, "Erro ao modificar posição.");
    }

    [HttpPatch("modify-team")]
    public async Task<IActionResult> ModifyTeam([FromBody] EmployeeDTO employee, [FromQuery] string newTeam)
    {
        if (string.IsNullOrWhiteSpace(newTeam))
            return BadRequest("Time não pode ser vazio.");

        var result = await _userEditService.ModifyTeamEmployee(employee, newTeam);
        if (result)
            return Ok("Time modificado com sucesso.");

        return StatusCode(500, "Erro ao modificar time.");
    }

    [HttpPost("add-skill")]
    public async Task<IActionResult> AddSkill([FromBody] EmployeeDTO employee) ///add skill 
    {
        
        return Ok("Skill adicionada com sucesso.");
    }



}
