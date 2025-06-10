using Microsoft.Extensions.Configuration;
using Npgsql;
using Dapper;
using BCrypt;
namespace Performetric.API.Services
{

    public class RegistrationTeamService
    {
        private readonly IConfiguration _configuration;

        public RegistrationTeamService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<List<TeamDTO>> GetAllTeamsAsync()
        {
            var connectionString = _configuration.GetConnectionString("DefaultConnection");

            using var connection = new NpgsqlConnection(connectionString);
            await connection.OpenAsync();

            var query = @"SELECT id, team_name AS TeamName, description FROM teams";

            var teams = await connection.QueryAsync<TeamDTO>(query);

            return teams.ToList();
        }


        public async Task<bool> RegisterTeamAsync(string teamName, string description)
        {
            var connectionString = _configuration.GetConnectionString("DefaultConnection");

            using var connection = new NpgsqlConnection(connectionString);
            await connection.OpenAsync();

            var exists = await connection.ExecuteScalarAsync<bool>(
                "SELECT EXISTS (SELECT 1 FROM teams WHERE team_name = @TeamName)",
                new { TeamName = teamName }
            );

            if (exists)
            {
                Console.WriteLine("Já existe uma equipe com este nome.");
                return false;
            }

            var query = "INSERT INTO teams (team_name, description) VALUES (@TeamName, @Description)";
            
            var result = await connection.ExecuteAsync(query, new { TeamName = teamName, Description = description });

            return result > 0;
        }
    }





}