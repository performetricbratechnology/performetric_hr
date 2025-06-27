using Microsoft.AspNetCore.Mvc;              // Para ControllerBase, ApiController, Route, HttpPost, IActionResult, FromBody etc.
using Performetric.API.Services;              // Para AuthService, RegisterRequestDTO, LoginRequestDTO (ajuste o namespace se for diferente)


[ApiController]
[Route("api/test")]
public class TestController : ControllerBase
{
    private readonly AuthService _authService;

    public TestController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("adduser")]
    public async Task<IActionResult> AddUser([FromBody] RegisterRequestDTO dto)
    {
        var created = await _authService.InsertTestUserAsync(dto.Email, dto.Password);
        if (!created)
            return BadRequest("Erro ao criar usuário de teste.");

        return Ok("Usuário de teste criado com sucesso.");
    }

    [HttpGet]
    public IActionResult Test()
    {
        return Ok("API está funcionando!");
    }

}
