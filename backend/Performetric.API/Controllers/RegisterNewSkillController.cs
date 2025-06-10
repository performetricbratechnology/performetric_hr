using Microsoft.AspNetCore.Mvc;
using Performetric.API.Services;
using Performetric.API; // Caso seus DTOs estejam nesse namespace
using Performetric.API.Models; // Caso seu model Skill esteja aqui
using Supabase; // Verifique o namespace correto se necessário

namespace Performetric.API.Controllers
{
    [ApiController]
    [Route("api/registrations")]
    public class RegisterNewSkillController : ControllerBase
    {
        private readonly Supabase.Client _supabaseClient;
        private readonly RegistrationSkillService _registerService;

        public RegisterNewSkillController(Supabase.Client supabaseClient, RegistrationSkillService registerService)
        {
            _supabaseClient = supabaseClient;
            _registerService = registerService;
        }

        [HttpGet("skills")]
        public async Task<IActionResult> GetAll()
        {
            Console.WriteLine("🔍 Buscando todos as Skills registradas...");
            var skills = await _registerService.GetAllSkillsAsync();
            return Ok(skills);
        }

        [HttpPost("skills")]
        public async Task<IActionResult> Register([FromBody] SkillDTO request)
        {
            if (!ModelState.IsValid)
                return BadRequest("Requisição inválida.");

            Console.WriteLine("📥 Registro recebido:");
            Console.WriteLine($" - Nome: {request.SkillName}");
           
         

            // Verifica se usuário já existe
            var response = await _supabaseClient
                .From<Skill>()
                .Where(s => s.SkillName == request.SkillName)
                .Limit(1)
                .Get();



            var createdSkill = await _registerService.RegisterSkillAsync(
                request.SkillName
                
               
            );


            if (!createdSkill)
                return Conflict("Já existe uma skill com este nome.");

            return Ok(new { message = "✅ Skill registrado com sucesso." });
            
        }
    }
}
