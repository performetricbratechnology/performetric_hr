using Microsoft.AspNetCore.Mvc;

namespace Performetric.API.Interfaces
{

    public interface IAuthService
    {
        bool Authenticate(string mail, string password);

    }
}