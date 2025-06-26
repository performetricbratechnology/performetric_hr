using Performetric.API.Services;
using System.Threading.Tasks;

namespace Performetric.API.Services.Interfaces
{
    public interface IUserEdit
    {
        Task<bool> ModifyNameEmployee(EmployeeDTO employee, string newName);
        Task<bool> ModifyPositionEmployee(EmployeeDTO employee, string newPosition);
        Task<bool> ModifyTeamEmployee(EmployeeDTO employee, string newTeam);

        Task<bool> NewSkillToEmployee(Guid employeeId, Guid skillId);
        Task<bool> RemoveSkillFromEmployee(Guid id);
    }

}