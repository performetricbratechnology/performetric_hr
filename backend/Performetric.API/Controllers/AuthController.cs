using Microsoft.AspNetCore.Mvc;              
using Performetric.API.Services;        
using Performetric.API.Interfaces;
using Performetric.API.DTOs;
using Performetric.API.Models;
using Performetric.API.Security;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;



[ApiController]
[Route("api/test")]
public class AuthController : ControllerBase
{

    public readonly IAuthService _authservice;
    public readonly TokenService _tokenService;


    public AuthController(IAuthService authService, TokenService tokenService)
    {
        _authservice = authService;
        _tokenService = tokenService;
    }

    [HttpGet("get-all-user-credentials")]
    public async Task<IActionResult> GetAllUsersCredentials()
    {
        var user_credentials = await _authservice.GetAllCredentials();
        return Ok(user_credentials);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Authenticate([FromBody] LoginRequestDTO request)
    {
        var user = await _authservice.Authenticate(request.MailId, request.PasswordId);


        if (user == null)
            return Unauthorized(new { message = "Email ou senha inválidos." });

        var token = _tokenService.Generate(user);

        return Ok(new { token });

    }

    [HttpGet("generate-token")]
    public IActionResult GenerateToken()
    {
        var user = new User
        {
            UserId = 1,
            MailId = "teste@exemplo.com",
            IsStaff = true
        };

        try
        {
            var keyBytes = Convert.FromBase64String(Configuration.PrivateKey);
            Console.WriteLine("Chave base64 válida! Tamanho em bytes: " + keyBytes.Length);
        }
        catch (FormatException e)
        {
            Console.WriteLine("Erro na chave base64: " + e.Message);
            return BadRequest("Chave inválida.");
        }

        var token = _tokenService.Generate(user);

        return Ok(new { token });
    }
}



 


