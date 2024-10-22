using CinameManageMent.Data;
using CinameManageMent.Models;
using CinameManageMent.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CinameManageMent.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShowTimeController : ControllerBase
    {
        private readonly ShowTimeService showTimeService;
        public ShowTimeController(ShowTimeService showTimeService)
        {
            this.showTimeService = showTimeService;
        }
        [HttpGet("GetShowTime/{id}")]
        public IActionResult GetShowTime(int id)
        {
            try
            {
                return Ok(showTimeService.GetShowTime(id));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut("UpdateShowTime/{id}")]
        public IActionResult UpdateShowTime(int id, [FromBody] UpdateShowTime updateShowTime)
        {
            try
            {
                return Ok(new
                {
                    result = showTimeService.UpdateShowTime(id, updateShowTime),
                    Message = "Update Showtime Success"
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("CreateShowTime")]
        public IActionResult CreateShowTime([FromBody]AddShowTime addShowTime)
        {
            try
            {
                return Ok(new
                {
                    result=showTimeService.AddShowTime(addShowTime),
                    Message="Create ShowTiime Success"
                });
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
