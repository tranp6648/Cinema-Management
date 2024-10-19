using CinameManageMent.Data;
using CinameManageMent.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CinameManageMent.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScreenController : ControllerBase
    {
        private readonly ScreenService screenService;
        public ScreenController(ScreenService screenService)
        {
            this.screenService = screenService;
        }
        [HttpPost("CreateScreen")]
        public IActionResult CreateScreen([FromBody] List<CreateSeat> createSeat)
        {
            try
            {
                return Ok(new
                {
                    result = screenService.CreateScreen(createSeat),
                    Message = "Create Screen Success"
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("ShowDetailSeat/{id}")]
        public IActionResult ShowDetailSeat(int id)
        {
            try
            {
                return Ok(screenService.ShowDetailSeat(id));
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
