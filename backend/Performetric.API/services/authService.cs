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

    public async Task<User?> Authenticate(string mail, string password)
    {
        var result = await _supabaseClient
            .From<User>()
            .Filter("mail_id", Supabase.Postgrest.Constants.Operator.Equals, mail)
            .Filter("password_id", Supabase.Postgrest.Constants.Operator.Equals, password)
            .Get();

             return result.Models?.FirstOrDefault();
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

