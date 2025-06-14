using Microsoft.AspNetCore.Mvc;
using Performetric.API.Services;
using Performetric.API.Services;
using System.Threading.Tasks;

namespace Performetric.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SelfEvaluationController : ControllerBase
{
    private readonly EvaluationService _service;

    public SelfEvaluationController(EvaluationService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] EvaluationDTO dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        if (dto.EvaluatorId != dto.EvaluateeId)
            return BadRequest("Na autoavaliação, o avaliador precisa ser o próprio avaliado.");

        dto.EvaluationType = "self";
        await _service.AddSelfEvaluationAsync(dto);
        return Ok("Autoavaliação registrada.");
    }
}
