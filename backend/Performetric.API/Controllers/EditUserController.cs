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



}
