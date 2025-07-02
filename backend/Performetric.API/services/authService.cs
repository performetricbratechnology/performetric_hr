using Microsoft.Extensions.Configuration;
using Performetric.API.DTOs;
using Performetric.API.Models;
using Performetric.API.Interfaces;
using Supabase.Postgrest.Models;
using System.Linq;
using System;

namespace Performetric.API.Services;

public class AuthService : IAuthService
{
    private readonly Supabase.Client _supabaseClient;

    public AuthService(Supabase.Client supabaseClient)
    {
        _supabaseClient = supabaseClient;
    }

    public async Task<bool> Authenticate(string mail, string password)
    {
        var result = await _supabaseClient
            .From<User>()
            .Filter("MailId", Supabase.Postgrest.Constants.Operator.Equals, mail)
            .Filter("PasswordId", Supabase.Postgrest.Constants.Operator.Equals, password)
            .Get();

        return result.Models != null && result.Models.Any();
    }

    public async Task<List<LoginRequestDTO>> GetAllCredentials()
    {
        var credentialsResponse = await _supabaseClient
            .From<User>()
            .Get();

        return credentialsResponse.Models.Select(c => new LoginRequestDTO
        {
            MailId = c.MailId,
            PasswordId = c.PasswordId
        }).ToList();
    }
    
}

