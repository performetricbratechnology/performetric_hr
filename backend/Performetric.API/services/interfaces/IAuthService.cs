using Microsoft.AspNetCore.Mvc;

namespace Performetric.API.Services.Interfaces
{

    public interface IAuthService
    {
        bool Authenticate(string mail, string password);

    }
}