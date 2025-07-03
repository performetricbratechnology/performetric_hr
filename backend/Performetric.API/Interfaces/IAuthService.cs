using Performetric.API.Services;
using Performetric.API.DTOs;
using Performetric.API.Interfaces;
using System.Threading.Tasks;
using Performetric.API.Models;
namespace Performetric.API.Interfaces
{

    public interface IAuthService
    {
        Task<User?> Authenticate(string mail, string password);
        Task<List<LoginRequestDTO>> GetAllCredentials();

    }
}