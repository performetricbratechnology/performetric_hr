using Microsoft.AspNetCore.Mvc;

namespace Performetric.API.Controllers
{
    [ApiController]
    [Route("api/test")]
    public class TestController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Funcionou a API");
        }
    }
}
