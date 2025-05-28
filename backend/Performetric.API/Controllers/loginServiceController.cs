using Microsoft.AspNetCore.Mvc;
using Performetric.API.Services;


namespace Performetric.API.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO login)
        {
            bool isValid = await _authService.ValidateUserAsync(login.Email, login.Password);
            if (!isValid)
                return Unauthorized(new { message = "Credenciais inválidas." });

            return Ok(new { message = "Login bem-sucedido!" });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDTO registerRequest)
        {

            bool created = await _authService.InsertTestUserAsync(registerRequest.Email, registerRequest.Password);

            if (!created)
                return BadRequest(new { message = "Erro ao criar usuário." });

            return Ok(new { message = "Usuário criado com sucesso!" });
        }
    }
}
