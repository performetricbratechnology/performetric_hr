using Microsoft.AspNetCore.Mvc;              // Para ControllerBase, ApiController, Route, HttpPost, IActionResult, FromBody etc.
using Performetric.API.Services;              // Para AuthService, RegisterRequestDTO, LoginRequestDTO (ajuste o namespace se for diferente)


namespace Performetric.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegisterNewUserController : ControllerBase
    {
        private readonly Supabase.Client _supabaseClient;
        private readonly RegistrationService _registerService;

        public RegisterNewUserController(Supabase.Client supabaseClient, RegistrationService registerService)
        {
            _supabaseClient = supabaseClient;
            _registerService = registerService;
        }

        [HttpPost("registrations")]
        public async Task<IActionResult> Register([FromBody] RegistrationDTO request)
        {
            //Teste para verificar se o serviço está funcionando
            Console.WriteLine("Recebido registro:");
            Console.WriteLine($"Nome: {request.FullName}");
            Console.WriteLine($"Cargo: {request.Position}");
            Console.WriteLine($"Email: {request.Email}");
            Console.WriteLine($"Equipe: {request.Team}");

            //Consulta banco de dados para verificar as credenciais
            var response = await _supabaseClient
                .From<User>()
                .Select("mail_id")
                .Where(u => u.MailId == request.Email)
                .Limit(1)
                .Get();

            var user = response.Models.FirstOrDefault();
            if (user != null)
            {
                return BadRequest(new { message = "Usuário já existe." });
            }

            // Cria um novo usuário
            var created = await _registerService.RegisterUserAsync(
                request.FullName,
                request.Position,
                request.Email,
                request.Team
            );
            if (!created)
                return BadRequest("Erro ao criar usuário.");

            return Ok(new { message = "Usuário registrado com sucesso." });
        }

    }
}