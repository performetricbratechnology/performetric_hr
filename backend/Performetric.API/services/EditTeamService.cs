using Performetric.API.Controllers;
using Performetric.API.Models;
using Performetric.API.DTOs;
using Performetric.API.Interfaces;
using Supabase.Postgrest.Models;
using System.Linq;
using System;


namespace Performetric.API.Services;


public class EditTeamService : ITeamEdit
{
    private readonly Supabase.Client _supabaseClient;

    public EditTeamService(Supabase.Client supabaseClient)
    {
        _supabaseClient = supabaseClient;
    }

    public async Task<bool> ModifyNameTeam(TeamDTO teamDTO, string newNameTeam)
    {
        var existing = await _supabaseClient
            .From<Team>()
            .Where(e => e.TeamId == teamDTO.Id)
            .Single();

        if (existing == null)
            return false;

        existing.TeamName = newNameTeam;

        var response = await _supabaseClient
            .From<Team>()
            .Update(existing);

        return response.Models != null && response.Models.Any();

    }

    public async Task<bool> ModifyDescriptionTeam(TeamDTO teamDTO, string newDescriptionTeam)
    {
         var existing = await _supabaseClient
            .From<Team>()
            .Where(e => e.TeamId == teamDTO.Id)
            .Single();

        if (existing == null)
            return false;

        existing.Description = newDescriptionTeam;

        var response = await _supabaseClient
            .From<Team>()
            .Update(existing);

        return response.Models != null && response.Models.Any();
    }


}