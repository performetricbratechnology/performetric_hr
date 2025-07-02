using Performetric.API.Services;
using Performetric.API.DTOs;
using Performetric.API.Interfaces;
using System.Threading.Tasks;
namespace Performetric.API.Interfaces
{

    public interface IAuthService
    {
        Task<bool> Authenticate(string mail, string password);
        Task<List<LoginRequestDTO>> GetAllCredentials();

    }
}