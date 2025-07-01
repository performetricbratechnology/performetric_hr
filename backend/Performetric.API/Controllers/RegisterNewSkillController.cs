using Microsoft.AspNetCore.Mvc;
using Performetric.API.Services;
using Performetric.API.Services.Interfaces;
using Performetric.API; // Caso seus DTOs estejam nesse namespace
using Performetric.API.Models; // Caso seu model Skill esteja aqui
using Supabase; // Verifique o namespace correto se necessário

namespace Performetric.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RegisterNewSkillController : ControllerBase
{
    private readonly IRegisterService _registerSkillService;
    public RegisterNewSkillController(IRegisterService registerSkillService)
    {
        _registerSkillService = registerSkillService;
    }

    [HttpPost("register-new-skill")]
    public async Task<IActionResult> RegisterNewSkill([FromBody] SkillDTO skill)
    {
        if (string.IsNullOrWhiteSpace(skill.SkillName))
            return BadRequest("Nome não pode ser vazio.");

        var result = await _registerSkillService.RegisterSkill(skill);
        if (result)
            return Ok("Deu certo");

        return StatusCode(500, "Erro ao criar");

    }

    [HttpGet("all-skills")]
    public async Task<IActionResult> GetAllSkills()
    {
        var skills = await _registerSkillService.GetAllSkills();
        
        if (skills == null || !skills.Any())
            return NotFound("Nenhuma skill encontrada.");

        return Ok(skills);
    }


}
