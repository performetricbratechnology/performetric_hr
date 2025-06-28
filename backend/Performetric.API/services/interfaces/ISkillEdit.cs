using Performetric.API.Services;
using System.Threading.Tasks;

namespace Performetric.API.Services.Interfaces
{
    public interface ISkillEdit
    {
        Task<bool> ModifyNameSkill(SkillDTO skill, string newNameSkill);
        Task<bool> ModifyCategorySkill(SkillDTO skill, string newCategorySkill);
        Task<bool> ModifyDescriptionSkill(SkillDTO skill, string newDescriptionSkill);
    }

}