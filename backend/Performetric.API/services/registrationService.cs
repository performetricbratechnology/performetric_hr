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
        
        public async Task<List<EmployeeDTO>> GetAllUsersAsync()
        {
            var connectionString = _configuration.GetConnectionString("DefaultConnection");
            
            using var connection = new NpgsqlConnection(connectionString);
            await connection.OpenAsync();

            var query = @"SELECT id, full_name AS FullName, position, email, team FROM employees";

            var users = await connection.QueryAsync<EmployeeDTO>(query);

            return users.ToList();
        }


        public async Task<bool> RegisterUserAsync(string fullName, string position, string email, string team)
        {
            var connectionString = _configuration.GetConnectionString("DefaultConnection");

            var connection = new NpgsqlConnection(connectionString);
            await connection.OpenAsync();

            var exists = await connection.ExecuteScalarAsync<bool>(
            "SELECT EXISTS (SELECT 1 FROM user_credentials WHERE mail_id = @Email)",
            new { Email = email }
            );


            var alreadyExists = await connection.ExecuteScalarAsync<bool>(
            "SELECT EXISTS (SELECT 1 FROM employees WHERE email = @Email)",
            new { Email = email }
            );

            if (!exists)
            {
                Console.WriteLine("Usuário não existe em user_credentials.");
                return false;
            }

          



           if (alreadyExists)
            {
                Console.WriteLine("Usuário já existe em employees.");
                return false;
            }


            var query = @"INSERT INTO employees (fullName, position, email, team) 
                        VALUES (@FullName, @Position, @Email, @Team)";

            var parameters = new
            {
                FullName = fullName,
                Position = position,
                Email = email,
                Team = team
            };

            int rowsInserted = await connection.ExecuteAsync(query, parameters);

            return rowsInserted > 0;
        }
        
        


    }
}