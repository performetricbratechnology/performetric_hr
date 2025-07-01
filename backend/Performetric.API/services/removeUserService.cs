using Microsoft.Extensions.Configuration;
using Performetric.API.DTOs;
using Performetric.API.Interfaces;
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
        public async Task<bool> RemoveTeamAsync(string id)
        {

            if (!Guid.TryParse(id, out var parsedTeamId))
            {
                Console.WriteLine("ID de time inválido.");
                return false;
            }

            var connectionString = _configuration.GetConnectionString("DefaultConnection");

            using var connection = new NpgsqlConnection(connectionString);
            await connection.OpenAsync();

            // Check if the team exists
            var exists = await connection.ExecuteScalarAsync<bool>(
                "SELECT EXISTS (SELECT 1 FROM teams WHERE id = @id)",
                new { id = parsedTeamId }
            );

            if (!exists)
            {
                Console.WriteLine("Time não encontrado.");
                return false;
            }

            // Delete the team
            var query = "DELETE FROM teams WHERE id = @id";
            var result = await connection.ExecuteAsync(query, new { id = parsedTeamId });

            return result > 0;
        }


        // Método para remover uma skill
        // Este método deve ser chamado quando uma skill for removida
        public async Task<bool> RemoveSkillAsync(string id)
        {

            if (!Guid.TryParse(id, out var parsedSkillId))
            {
                Console.WriteLine("ID de skill inválido.");
                return false;
            }

            var connectionString = _configuration.GetConnectionString("DefaultConnection");

            using var connection = new NpgsqlConnection(connectionString);
            await connection.OpenAsync();

            // Check if the skill exists
            var exists = await connection.ExecuteScalarAsync<bool>(
                "SELECT EXISTS (SELECT 1 FROM skills WHERE id = @id)",
                new { id = parsedSkillId }
            );

            if (!exists)
            {
                Console.WriteLine("Skill não encontrado.");
                return false;
            }

            // Delete the skill
            var query = "DELETE FROM skills WHERE id = @id";
            var result = await connection.ExecuteAsync(query, new { id = parsedSkillId });

            return result > 0;
        }

    }




}