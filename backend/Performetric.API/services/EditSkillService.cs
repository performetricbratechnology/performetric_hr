using Performetric.API.Controllers;
using Performetric.API.Services.Interfaces;
using Performetric.API.Models;
using Supabase.Postgrest.Models;
using System.Linq;
using System;


namespace Performetric.API.Services;


public class EditSkillService : ISkillEdit
{
    private readonly Supabase.Client _supabaseClient;

    public EditSkillService(Supabase.Client supabaseClient)
    {
        _supabaseClient = supabaseClient;
    }

    public async Task<bool> ModifyNameSkill(SkillDTO skillDTO, string newNameSkill)
    {
        var existing = await _supabaseClient
            .From<Skill>()
            .Where(e => e.SkillId == skillDTO.SkillId)
            .Single();

        if (existing == null)
            return false;

        existing.SkillName = newNameSkill;

        var response = await _supabaseClient
            .From<Skill>()
            .Update(existing);

        return response.Models != null && response.Models.Any();

    }

    public async Task<bool> ModifyDescriptionSkill(SkillDTO skillDTO, string newDescriptionSkill)
    {
        var existing = await _supabaseClient
           .From<Skill>()
           .Where(e => e.SkillId == skillDTO.SkillId)
           .Single();

        if (existing == null)
            return false;

        existing.SkillDescription = newDescriptionSkill;

        var response = await _supabaseClient
            .From<Skill>()
            .Update(existing);

        return response.Models != null && response.Models.Any();
    }
    
      public async Task<bool> ModifyCategorySkill(SkillDTO skillDTO, string newCategorySkill)
    {
        return true;
    }
    


}