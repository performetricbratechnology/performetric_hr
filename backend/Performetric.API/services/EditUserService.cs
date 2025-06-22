using Performetric.API.Controllers;
using Performetric.API.Services.Interfaces;
using Performetric.API.Models;
using Supabase.Postgrest.Models;
using System.Linq;
using System;


namespace Performetric.API.Services;


public class EditUserService : IUserEdit
{
    private readonly Supabase.Client _supabaseClient;

    public EditUserService(Supabase.Client supabaseClient)
    {
        _supabaseClient = supabaseClient;
    }

    public async Task<bool> ModifyNameEmployee(EmployeeDTO employeeDTO, string newName)
    {
        var existing = await _supabaseClient
            .From<Employees>()
            .Where(e => e.EmployeeId == employeeDTO.Id)
            .Single();

        if (existing == null)
            return false;

        existing.FullName = newName;

        var response = await _supabaseClient
            .From<Employees>()
            .Update(existing);

        return response.Models != null && response.Models.Any();
    
    }

    public async Task<bool> ModifyPositionEmployee(EmployeeDTO employee, string newPosition)
    {
        return false; // Implementar lógica para modificar a posição do funcionário
      
    }

    public async Task<bool> ModifyTeamEmployee(EmployeeDTO employee, string newTeam)
    {

        return false; // Implementar lógica para modificar o time do funcionário
        
    }



    public async Task NewSkillToEmployee(EmployeeDTO employee, SkillDTO skill)
    {
        // Implementar lógica para adicionar nova skill ao funcionário
        throw new NotImplementedException();
    }

    public async Task RemoveSkillFromEmployee(EmployeeDTO employee, SkillDTO skill)
    {
        // Implementar lógica para remover skill do funcionário
        throw new NotImplementedException();
    }
}