using Microsoft.AspNetCore.Mvc;
using Performetric.API.Services;
using System.Threading.Tasks;
using Performetric.API.Interfaces;

using Performetric.API.DTOs;


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
        Console.WriteLine($"Employee ID: {employee?.Id}");
        Console.WriteLine($"NewName: {newName}");
        
        if (string.IsNullOrWhiteSpace(newName))
            return BadRequest("Nome não pode ser vazio.");

        if (employee == null || employee.Id == Guid.Empty)
            return BadRequest("Employee inválido.");

        var result = await _userEditService.ModifyNameEmployee(employee, newName);
        if (result)
            return Ok("Nome modificado com sucesso.");

        return StatusCode(500, "Erro ao modificar nome.");
    }

    [HttpPatch("modify-position")]
    public async Task<IActionResult> ModifyPosition([FromBody] EmployeeDTO employee, [FromQuery] string newPosition)
    {
        Console.WriteLine($"NewPosition: {newPosition}");


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
    public async Task<IActionResult> AddSkill([FromBody] AddSkillDTO employee)
    {
        if (employee == null || employee.EmployeeId == Guid.Empty || employee.SkillId == Guid.Empty)
            return BadRequest("Dados inválidos para adicionar skill.");

        try
        {
            var result = await _userEditService.NewSkillToEmployee(employee.EmployeeId, employee.SkillId);
            if (result)
                return Ok("Skill adicionada com sucesso.");
            else
                return StatusCode(500, "A skill não foi adicionada. Verifique os dados.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao adicionar skill: {ex.Message}");
        }
    }

    [HttpPost("remove-skill")]
    public async Task<IActionResult> RemoveSkill([FromBody] RemoveSkillDTO skill)
    {
        if (skill == null || skill.Id == Guid.Empty)
            return BadRequest("Dados inválidos para remover skill.");

        try
        {
            var result = await _userEditService.RemoveSkillFromEmployee(skill.Id);
            if (result)
                return Ok("Skill removida com sucesso.");
            else
                return StatusCode(500, "A skill não foi removida. Verifique os dados.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao remover skill: {ex.Message}");
        }
    }

}
