using Microsoft.Extensions.Configuration;
using Npgsql;
using Dapper;
using BCrypt;
namespace Performetric.API.Services
{

    public class RemoveUserService
    {
        private readonly IConfiguration _configuration;

        public RemoveUserService(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        // Método para remover um usuário
        // Este método deve ser chamado quando um usuário for removido
        public async Task<bool> RemoveUserAsync(string userId)
        {

            if (!Guid.TryParse(userId, out var parsedUserId))
            {
                Console.WriteLine("ID de usuário inválido.");
                return false;
            }

            var connectionString = _configuration.GetConnectionString("DefaultConnection");

            using var connection = new NpgsqlConnection(connectionString);
            await connection.OpenAsync();

            // Check if the user exists
            var exists = await connection.ExecuteScalarAsync<bool>(
                "SELECT EXISTS (SELECT 1 FROM employees WHERE id = @UserId)",
                new { UserId = parsedUserId }
            );

            if (!exists)
            {
                Console.WriteLine("Usuário não encontrado.");
                return false;
            }

            // Delete the user
            var query = "DELETE FROM employees WHERE id = @UserId";
            var result = await connection.ExecuteAsync(query, new { UserId = parsedUserId });

            return result > 0;
        }

        // Método para remover um time
        // Este método deve ser chamado quando um time for removido
        public async Task<bool> RemoveTeamAsync(string teamId)
        {

            if (!Guid.TryParse(teamId, out var parsedTeamId))
            {
                Console.WriteLine("ID de time inválido.");
                return false;
            }

            var connectionString = _configuration.GetConnectionString("DefaultConnection");

            using var connection = new NpgsqlConnection(connectionString);
            await connection.OpenAsync();

            // Check if the team exists
            var exists = await connection.ExecuteScalarAsync<bool>(
                "SELECT EXISTS (SELECT 1 FROM teams WHERE id = @TeamId)",
                new { UserId = parsedTeamId }
            );

            if (!exists)
            {
                Console.WriteLine("Time não encontrado.");
                return false;
            }

            // Delete the team
            var query = "DELETE FROM teams WHERE id = @TeamId";
            var result = await connection.ExecuteAsync(query, new { TeamId = parsedTeamId });

            return result > 0;
        }


        // Método para remover uma skill
        // Este método deve ser chamado quando uma skill for removida
        public async Task<bool> RemoveSkillAsync(string skillId)
        {

            if (!Guid.TryParse(skillId, out var parsedSkillId))
            {
                Console.WriteLine("ID de skill inválido.");
                return false;
            }

            var connectionString = _configuration.GetConnectionString("DefaultConnection");

            using var connection = new NpgsqlConnection(connectionString);
            await connection.OpenAsync();

            // Check if the skill exists
            var exists = await connection.ExecuteScalarAsync<bool>(
                "SELECT EXISTS (SELECT 1 FROM skills WHERE id = @SkillId)",
                new { UserId = parsedSkillId }
            );

            if (!exists)
            {
                Console.WriteLine("Skill não encontrado.");
                return false;
            }

            // Delete the skill
            var query = "DELETE FROM skills WHERE id = @SkillId";
            var result = await connection.ExecuteAsync(query, new { SkillId = parsedSkillId });

            return result > 0;
        }

    }




}