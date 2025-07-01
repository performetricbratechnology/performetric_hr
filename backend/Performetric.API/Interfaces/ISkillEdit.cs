using Performetric.API.Services;
using System.Threading.Tasks;
using Performetric.API.DTOs;
using Performetric.API.Interfaces;

namespace Performetric.API.Interfaces
{
    public interface ISkillEdit
    {
        Task<bool> ModifyNameSkill(SkillDTO skill, string newNameSkill);
        Task<bool> ModifyCategorySkill(SkillDTO skill, string newCategorySkill);
        Task<bool> ModifyDescriptionSkill(SkillDTO skill, string newDescriptionSkill);
    }

}