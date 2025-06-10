using Microsoft.AspNetCore.Mvc;
using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;
using Supabase;

namespace Performetric.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DatabaseHealthController : ControllerBase
    {
        private readonly Client _supabaseClient;

        public DatabaseHealthController(Client supabaseClient)
        {
            _supabaseClient = supabaseClient;
        }

        [HttpGet("ping")]
        public async Task<IActionResult> Ping()
        {
            try
            {
                var response = await _supabaseClient
                    .From<User>()
                    .Select("mail_id, password_id")
                    .Limit(1)
                    .Get();

                var user = response.Models.FirstOrDefault();

                return Ok(new
                {
                    status = "BANCO DE DADOS OK",
                    mail_id = user?.MailId ?? "Nenhum email",
                    password_id = user?.PasswordId ?? "Nenhuma senha"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    status = "Erro",
                    error = ex.Message
                });
            }
        }

        [Table("user_credentials")]
        public class User : BaseModel
        {
            [Column("mail_id")]
            public string MailId { get; set; }

            [Column("password_id")]
            public string PasswordId { get; set; }
        }

    }
}

