using Performetric.API.Services;
using Performetric.API.DTOs;
using Performetric.API.Interfaces;
using System.Threading.Tasks;

namespace Performetric.API.Interfaces
{
    public interface IRegisterService
    {
        Task<bool> RegisterSkill(SkillDTO skill);
        Task<List<SkillDTO>> GetAllSkills();

    }
    
}