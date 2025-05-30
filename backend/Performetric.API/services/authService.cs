using Microsoft.Extensions.Configuration;
using Npgsql;
using Dapper;
using BCrypt;
namespace Performetric.API.Services
{
    public class AuthService
    {
        private readonly IConfiguration _configuration;

        public AuthService(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        public async Task<bool> InsertTestUserAsync(string email, string password)
        {
            var connectionString = _configuration.GetConnectionString("DefaultConnection");

            var passwordHash = BCrypt.Net.BCrypt.HashPassword(password);

            var connection = new NpgsqlConnection(connectionString);
            await connection.OpenAsync();

            var query = "INSERT INTO credentialsTest (email, password_id) VALUES (@Email, @PasswordHash)";
            var parameters = new { Email = email, PasswordHash = passwordHash };

            int rowsInserted = await connection.ExecuteAsync(query, parameters);

            return rowsInserted > 0;
        }


        public async Task<bool> ValidateUserAsync(string email, string password)
        {
            var connectionString = _configuration.GetConnectionString("DefaultConnection");

            using var connection = new NpgsqlConnection(connectionString);
            await connection.OpenAsync();

            var query = "SELECT password_id FROM credentialsTest WHERE email = @Email LIMIT 1";

            var storedHash = await connection.QueryFirstOrDefaultAsync<string>(query, new { Email = email });

            if (string.IsNullOrEmpty(storedHash))
                return false;

            // Aqui a verificação da senha com o hash armazenado
            return BCrypt.Net.BCrypt.Verify(password, storedHash);
        }
    }
}
