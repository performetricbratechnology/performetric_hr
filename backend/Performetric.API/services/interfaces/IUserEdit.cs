using Performetric.API.Services;
using System.Threading.Tasks;

namespace Performetric.API.Services.Interfaces
{
    public interface IUserEdit
    {

        Task<bool> ModifyNameEmployee(EmployeeDTO employee, string newName);
        Task<bool> ModifyPositionEmployee(EmployeeDTO employee, string newPosition);
        Task<bool> ModifyTeamEmployee(EmployeeDTO employee, string newTeam);

        Task NewSkillToEmployee(EmployeeDTO employee, SkillDTO skill);
        Task RemoveSkillFromEmployee(EmployeeDTO employee, SkillDTO skill);
      
    }
}