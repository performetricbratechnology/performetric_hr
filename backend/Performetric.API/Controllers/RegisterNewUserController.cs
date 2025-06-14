using Microsoft.AspNetCore.Mvc;
using Performetric.API.Services;
using Performetric.API.Models;
using Performetric.API; // Caso seus DTOs estejam nesse namespace
using Performetric.API; // Caso seu model User esteja aqui
using Supabase; // Verifique o namespace correto se necessário

namespace Performetric.API.Controllers
{
    [ApiController]
    [Route("api/registrations")]
    public class RegisterNewUserController : ControllerBase
    {
        private readonly Supabase.Client _supabaseClient;
        private readonly RegistrationService _registerService;

        public RegisterNewUserController(Supabase.Client supabaseClient, RegistrationService registerService)
        {
            _supabaseClient = supabaseClient;
            _registerService = registerService;
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetAll()
        {
            Console.WriteLine("🔍 Buscando todos os usuários registrados...");
            var users = await _registerService.GetAllUsersAsync();
            return Ok(users);
        }

        [HttpPost("users")]
        public async Task<IActionResult> Register([FromBody] RegistrationDTO request)
        {
            if (!ModelState.IsValid)
                return BadRequest("Requisição inválida.");

            Console.WriteLine("📥 Registro recebido:");
            Console.WriteLine($" - Nome: {request.FullName}");
            Console.WriteLine($" - Cargo: {request.Position}");
            Console.WriteLine($" - Email: {request.Email}");
            Console.WriteLine($" - Equipe: {request.Team}");

            // Verifica se usuário já existe
            var response = await _supabaseClient
                .From<User>()
                .Where(u => u.MailId == request.Email)
                .Limit(1)
                .Get();



            var created = await _registerService.RegisterUserAsync(
                request.FullName,
                request.Position,
                request.Email,
                request.Team
            );


            if (!created)
                return Conflict("Já existe um usuário com este email.");

            return Ok(new { message = "✅ Usuário registrado com sucesso." });
            
        }
    }
}
