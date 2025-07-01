using Performetric.API.Services;
using System.Threading.Tasks;

namespace Performetric.API.Services.Interfaces
{
    public interface IRegisterService
    {
        Task<bool> RegisterSkill(SkillDTO skill);
        Task<List<SkillDTO>> GetAllSkills();

    }
    
}