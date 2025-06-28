using Performetric.API.Services;
using System.Threading.Tasks;

namespace Performetric.API.Services.Interfaces
{
    public interface ITeamEdit
    {
        Task<bool> ModifyNameTeam(TeamDTO team, string newNameTeam);
        Task<bool> ModifyDescriptionTeam(TeamDTO team, string newDescriptionTeam);
    }

}