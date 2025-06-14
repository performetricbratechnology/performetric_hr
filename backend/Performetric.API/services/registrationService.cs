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

    await using var connection = new NpgsqlConnection(connectionString);
    await connection.OpenAsync();

    // Verifica se o usuário existe em user_credentials
    var userId = await connection.ExecuteScalarAsync<long?>(
        "SELECT id FROM user_credentials WHERE mail_id = @Email",
        new { Email = email }
    );

    if (userId == null)
    {
        Console.WriteLine("Usuário não existe em user_credentials.");
        return false;
    }

    // Verifica se o usuário já está cadastrado em employees (pelo user_id)
    var alreadyExists = await connection.ExecuteScalarAsync<bool>(
        "SELECT EXISTS (SELECT 1 FROM employees WHERE user_id = @UserId)",
        new { UserId = userId }
    );

    if (alreadyExists)
    {
        Console.WriteLine("Usuário já existe em employees.");
        return false;
    }

    // Insere na tabela employees vinculando ao user_id correto
    var query = @"INSERT INTO employees (user_id, full_name, position, email, team) 
                  VALUES (@UserId, @FullName, @Position, @Email, @Team)";

    var parameters = new
    {
        UserId = userId,
        FullName = fullName,
        Position = position,
        Email = email,
        Team = team
    };

    var rowsInserted = await connection.ExecuteAsync(query, parameters);

    return rowsInserted > 0;
}



       
        
        


    }
}