using Microsoft.AspNetCore.Mvc;
using Performetric.API.Services;
using Performetric.API.Services;
using Performetric.API.DTOs;
using Performetric.API.Interfaces;

using System.Threading.Tasks;

namespace Performetric.API.Controllers;


[ApiController]
[Route("api/[controller]")]
public class PeerEvaluationController : ControllerBase
{
    private readonly EvaluationService _service;

    public PeerEvaluationController(EvaluationService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] EvaluationDTO dto)
    {
        if (dto.EvaluatorId == dto.EvaluateeId)
            return BadRequest("Você não pode se autoavaliar aqui.");

        dto.EvaluationType = "peer";
        await _service.AddPeerEvaluationAsync(dto);
        return Ok("Avaliação de par registrada.");
    }
}
