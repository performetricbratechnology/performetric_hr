using Microsoft.Extensions.Configuration;
using Npgsql;
using Dapper;
using BCrypt;
namespace Performetric.API.Services
{
    public class RegistrationService
    {

        private readonly IConfiguration _configuration;

        public RegistrationService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<bool> RegisterUserAsync(string fullName, string position, string email, string team)
        {
            var connectionString = _configuration.GetConnectionString("DefaultConnection");

            var connection = new NpgsqlConnection(connectionString);
            await connection.OpenAsync();

            var query = "INSERT INTO employees (full_name, position, email, team) VALUES (@FullName, @Position, @Email, @Team)";
            var parameters = new { FullName = fullName, Position = position, Email = email, Team = team };

            int rowsInserted = await connection.ExecuteAsync(query, parameters);

            return rowsInserted > 0;
        }
        
        


    }
}