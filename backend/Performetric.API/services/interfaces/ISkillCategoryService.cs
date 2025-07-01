using Performetric.API.Services;
using System.Threading.Tasks;

namespace Performetric.API.Services.Interfaces
{
    public interface ISkillCategoryService
    {
        Task<List<SkillCategoriesDTO>> GetAllCategories();

    }
    
}