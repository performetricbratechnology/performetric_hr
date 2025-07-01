using Performetric.API.Services;
using System.Threading.Tasks;
using Performetric.API.DTOs;
using Performetric.API.Interfaces;

namespace Performetric.API.Interfaces
{
    public interface ITeamEdit
    {
        Task<bool> ModifyNameTeam(TeamDTO team, string newNameTeam);
        Task<bool> ModifyDescriptionTeam(TeamDTO team, string newDescriptionTeam);
    }

}