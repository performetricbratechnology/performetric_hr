using Microsoft.AspNetCore.Mvc;
using Performetric.API.Services;
using Performetric.API.Models;
using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;


namespace Performetric.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly Supabase.Client _supabaseClient;
        private readonly AuthService _authService;

        public AuthController(Supabase.Client supabaseClient, AuthService authService)
        {
            _supabaseClient = supabaseClient;
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO request)
        {
            //Teste para verificar se o serviço está funcionando
             Console.WriteLine("Recebido login:");
             Console.WriteLine($"Email: '{request.MailId}'");
             Console.WriteLine($"Password: '{request.PasswordId}'");

            //Consulta banco de dados para verificar as credenciais
            var response = await _supabaseClient
                .From<User>()
                .Select("mail_id, password_id")
                .Where(u => u.MailId == request.MailId && u.PasswordId == request.PasswordId)
                .Limit(1)
                .Get();
            

            var user = response.Models.FirstOrDefault();
            if (user == null || 
                user.PasswordId.Trim() != request.PasswordId.Trim() || 
                user.MailId.Trim().ToLower() != request.MailId.Trim().ToLower())
            {
                return Unauthorized(new { message = "Credenciais Incorretas." });
            }


            return Ok(new
            {
                message = "Login bem-sucedido.",
                user = new
                {
                    user.MailId,
                    user.PasswordId
                }
            });
        }
    }

  
}
