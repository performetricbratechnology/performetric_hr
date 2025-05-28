using Microsoft.AspNetCore.Mvc;
using Performetric.API.Services;

namespace Performetric.API.Controllers
{
    [ApiController]
    [Route("api/auth/login")]
    public class loginServiceController : ControllerBase
    {
        private readonly AuthService _authService;

        public loginServiceController(AuthService authService)
        {
            _authService = authService;
        }

        /*[HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO login)
        {
            bool isValid = await _authService.ValidateUserAsync(login.Email, login.Password);
            if (!isValid)
                return Unauthorized("Credenciais inválidas.");

            return Ok("Login bem-sucedido!");
        } */
    }
}
