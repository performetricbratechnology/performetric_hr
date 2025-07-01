using Microsoft.AspNetCore.Mvc;
using Performetric.API.Services.Interfaces;
using System.Threading.Tasks;

namespace Performetric.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SkillCategoryController : ControllerBase
{
    private readonly ISkillCategoryService _categoryService;

    public SkillCategoryController(ISkillCategoryService categoryService)
    {
        _categoryService = categoryService;
    }
    
    [HttpGet("get-all-categories")]
    public async Task<IActionResult> GetCategories()
    {
        var categories = await _categoryService.GetAllCategories();
        return Ok(categories);
    }
}
