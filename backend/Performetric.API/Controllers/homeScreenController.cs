using Microsoft.AspNetCore.Mvc;
using Performetric.API.DTOs;
using Performetric.API.Interfaces;


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
