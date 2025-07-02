using Microsoft.AspNetCore.Mvc;              
using Performetric.API.Services;        
using Performetric.API.Interfaces;
using Performetric.API.DTOs;


[ApiController]
[Route("api/test")]
public class AuthController : ControllerBase
{

    public readonly IAuthService _authservice;

    public AuthController(IAuthService authService)
    {
        _authservice = authService;
    }

    [HttpGet("get-all-user-credentials")]
    public async Task<IActionResult> GetAllUsersCredentials()
    {
        var user_credentials = await _authservice.GetAllCredentials();
        return Ok(user_credentials);
    }

 

}
