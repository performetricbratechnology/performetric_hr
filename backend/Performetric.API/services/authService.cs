using Microsoft.Extensions.Configuration;
using Npgsql;

namespace Performetric.API.Services
{
    public class AuthService
    {
        private readonly IConfiguration _configuration;

        public AuthService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<bool> ValidateUserAsync(string email, string password)
        {
            var connectionString = _configuration.GetConnectionString("DefaultConnection");

            using var connection = new NpgsqlConnection(connectionString);
            await connection.OpenAsync();

            var query = "SELECT COUNT(*) FROM credentialsTest WHERE email = @Email AND password_id = @Password";

            using var command = new NpgsqlCommand(query, connection);
            command.Parameters.AddWithValue("@Email", email);
            command.Parameters.AddWithValue("@Password", password);

            var result = (long)await command.ExecuteScalarAsync();

            return result > 0;
        }
    }
}
