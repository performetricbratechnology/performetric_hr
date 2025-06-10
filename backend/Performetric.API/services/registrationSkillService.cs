using Microsoft.Extensions.Configuration;
using Npgsql;
using Dapper;
using BCrypt;
namespace Performetric.API.Services
{

    public class RegistrationSkillService
    {
        private readonly IConfiguration _configuration;

        public RegistrationSkillService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<List<SkillDTO>> GetAllSkillsAsync()
        {
            var connectionString = _configuration.GetConnectionString("DefaultConnection");

            using var connection = new NpgsqlConnection(connectionString);
            await connection.OpenAsync();

            var query = @"SELECT id, skill_name AS SkillName FROM skills";

            var skills = await connection.QueryAsync<SkillDTO>(query);

            return skills.ToList();
        }


        public async Task<bool> RegisterSkillAsync(string skillName)
        {
            var connectionString = _configuration.GetConnectionString("DefaultConnection");

            using var connection = new NpgsqlConnection(connectionString);
            await connection.OpenAsync();

            var exists = await connection.ExecuteScalarAsync<bool>(
                "SELECT EXISTS (SELECT 1 FROM skills WHERE skill_name = @SkillName)",
                new { SkillName = skillName }
            );

            if (exists)
            {
                Console.WriteLine("Já existe uma skill com este nome.");
                return false;
            }

            var query = "INSERT INTO skills (skill_name) VALUES (@SkillName)";
            
            var result = await connection.ExecuteAsync(query, new { SkillName = skillName});

            return result > 0;
        }
    }





}