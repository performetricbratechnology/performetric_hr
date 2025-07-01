using Microsoft.AspNetCore.Mvc;
using Performetric.API.Services;
using Performetric.API.DTOs;
using Performetric.API.Interfaces;

using System.Threading.Tasks;

namespace Performetric.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EditSkillController : ControllerBase
{
    private readonly ISkillEdit _skillEditService;
    public EditSkillController(ISkillEdit skillEditService)
    {
        _skillEditService = skillEditService;
    }

    [HttpPatch("modify-name-skill")]
    public async Task<IActionResult> ModifyName([FromBody] SkillDTO skill, [FromQuery] string newNameSkill)
    {
        Console.WriteLine($"Team ID: {skill?.SkillId}");
        Console.WriteLine($"NewName: {newNameSkill}");

        if (string.IsNullOrWhiteSpace(newNameSkill))
            return BadRequest("Nome não pode ser vazio.");

        if (skill == null || skill.SkillId == Guid.Empty)
            return BadRequest("Team inválido.");

        var result = await _skillEditService.ModifyNameSkill(skill, newNameSkill);
        if (result)
            return Ok("Nome do skill modificado com sucesso.");

        return StatusCode(500, "Erro ao modificar nome do skill.");
    }


    [HttpPatch("modify-description-skill")]
    public async Task<IActionResult> ModifyDescription([FromBody] SkillDTO skill, [FromQuery] string newDescriptionSkill)
    {
        Console.WriteLine($"Team ID: {skill?.SkillId}");
        Console.WriteLine($"New Description: {newDescriptionSkill}");

        if (string.IsNullOrWhiteSpace(newDescriptionSkill))
            return BadRequest("Description não pode ser vazio.");

        if (skill == null || skill.SkillId == Guid.Empty)
            return BadRequest("Skill inválido.");

        var result = await _skillEditService.ModifyDescriptionSkill(skill, newDescriptionSkill);
        if (result)
            return Ok("Descricao da skill modificado com sucesso.");

        return StatusCode(500, "Erro ao modificar descricao da skill.");
        
    }


}
