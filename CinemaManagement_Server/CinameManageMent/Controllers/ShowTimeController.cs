using CinameManageMent.Data;
using CinameManageMent.Models;
using CinameManageMent.Services;
using Microsoft.AspNetCore.Authorization;
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
        [HttpGet("GetInfo/{Datetime}/{ID}")]
        public IActionResult getDate(DateTime datetime, int id)
        {
            try
            {


                return Ok(showTimeService.GetInfo(datetime, id));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("GetAllTime/{id}")]
        public IActionResult GetAllTime(int id)
        {
            try
            {
                return Ok(showTimeService.GetAllTime(id));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("GetSeat/{id}")]
        public IActionResult GetSeat(int id)
        {
            try
            {
                return Ok(showTimeService.GetSeat(id));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("CountShowTime")]
        [Authorize(Policy ="SuperAdmin")]
        public IActionResult CountShowtime()
        {
            return Ok(showTimeService.CountShowTime());
        }
        [HttpGet("CountShowTimeAdmin/{id}")]
        public IActionResult CountShowTimeAdmin(int id)
        {
            return Ok(showTimeService.CountShowTimeAdmin(id));
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
