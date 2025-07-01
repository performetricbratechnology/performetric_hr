using Performetric.API.Services;
using Performetric.API.DTOs;
using Performetric.API.Interfaces;
using System.Threading.Tasks;

namespace Performetric.API.Interfaces
{
    public interface ISkillCategoryService
    {
        Task<List<SkillCategoriesDTO>> GetAllCategories();

    }
    
}