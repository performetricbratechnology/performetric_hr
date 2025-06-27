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

    public async Task<bool> ModifyPositionEmployee(EmployeeDTO employeeDTO, string newPosition)
    {

    var existing = await _supabaseClient
        .From<Employees>()
        .Where(e => e.EmployeeId == employeeDTO.Id)
        .Single();

    if (existing == null)
        return false;

    existing.Position = newPosition;

    var response = await _supabaseClient
        .From<Employees>()
        .Update(existing);

    return response.Models != null &&  response.Models.Any();
      
    }

    public async Task<bool> ModifyTeamEmployee(EmployeeDTO employeeDTO, string newTeam)
    {
         var existing = await _supabaseClient
        .From<Employees>()
        .Where(e => e.EmployeeId == employeeDTO.Id)
        .Single();

        if (existing == null)
            return false;

        existing.Team = newTeam;

        var response = await _supabaseClient
            .From<Employees>()
            .Update(existing);

        return response.Models != null &&  response.Models.Any();

   
    }

    public async Task<bool> NewSkillToEmployee(Guid employeeId, Guid skillId)
    {
        var existing = await _supabaseClient
            .From<Employees>()
            .Where(e => e.EmployeeId == employeeId)
            .Single();

        var existingSkill = await _supabaseClient
            .From<Skill>()
            .Where(s => s.SkillId == skillId)
            .Single();

        if (existing == null || existingSkill == null)
            throw new ArgumentException("Funcionário ou skill não encontrado.");

        var response = await _supabaseClient
            .From<EmployeesSkills>()
            .Insert(new EmployeesSkills
            {
                Id = Guid.NewGuid(), // Gerar um novo ID para a nova skill
                EmployeeId = employeeId,
                SkillId = skillId
            });

        return response.Models != null && response.Models.Any();
    
      
    }

    public async Task<bool> RemoveSkillFromEmployee(Guid id)
    {
        var existing = await _supabaseClient
            .From<EmployeesSkills>()
            .Where(es => es.Id == id)
            .Single();

        if (existing == null)
            return false;

        await _supabaseClient
            .From<EmployeesSkills>()
            .Where(es => es.Id == id)
            .Delete();

        return true;
    }


}