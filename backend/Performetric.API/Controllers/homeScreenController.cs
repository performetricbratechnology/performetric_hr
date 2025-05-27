using Microsoft.AspNetCore.Mvc;

namespace Performetric.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class homeScreenController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("HomeScreen ok");
        }
    }
}
