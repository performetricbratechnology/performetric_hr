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
    public class RegisterNewTeamController : ControllerBase
    {
        private readonly Supabase.Client _supabaseClient;
        private readonly RegistrationTeamService _registerService;

        public RegisterNewTeamController(Supabase.Client supabaseClient, RegistrationTeamService registerService)
        {
            _supabaseClient = supabaseClient;
            _registerService = registerService;
        }

        [HttpGet("teams")]
        public async Task<IActionResult> GetAllTeams()
        {
            Console.WriteLine("🔍 Buscando todas as equipes registradas...");
            var teams = await _registerService.GetAllTeamsAsync();
            return Ok(teams);
        }


        [HttpPost("teams")]
        public async Task<IActionResult> RegisterTeam([FromBody] TeamDTO request)
        {
            if (!ModelState.IsValid)
                return BadRequest("Requisição inválida.");

            Console.WriteLine("📥 Registro de equipe recebido:");
            Console.WriteLine($" - Nome da Equipe: {request.TeamName}");
            Console.WriteLine($" - Descrição: {request.Description}");


            var response = await _supabaseClient
                .From<Team>()
                .Where(t => t.TeamName == request.TeamName)
                .Limit(1)
                .Get();

            var createdTeam = await _registerService.RegisterTeamAsync(
                request.TeamName,
                request.Description
            );

            if (!createdTeam)
                return Conflict("Já existe uma equipe com este nome.");

            return CreatedAtAction(nameof(GetAllTeams), new { teamName = request.TeamName }, request);
        }
    }
}