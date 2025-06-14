using Microsoft.AspNetCore.Mvc;
using Performetric.API.Services;
using Performetric.API.Services;
using System.Threading.Tasks;

namespace Performetric.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ManagerEvaluationController : ControllerBase
{
    private readonly EvaluationService _service;

    public ManagerEvaluationController(EvaluationService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] EvaluationDTO dto)
    {
        // Aqui você poderia checar no banco se dto.EvaluatorId é admin
        dto.EvaluationType = "manager";
        await _service.AddManagerEvaluationAsync(dto);
        return Ok("Avaliação de gerente/RH registrada.");
    }
}
