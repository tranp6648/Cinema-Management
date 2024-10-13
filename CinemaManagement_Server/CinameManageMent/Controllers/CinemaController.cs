using CinameManageMent.Data;
using CinameManageMent.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CinameManageMent.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CinemaController : ControllerBase
    {
        private readonly CinemaService cinemaService;
        public CinemaController(CinemaService cinemaService)
        {
            this.cinemaService = cinemaService;
        }
        [HttpPut("UpdateCinema/{id}")]
        [Authorize(Policy = "SuperAdmin")]
        public IActionResult UpdateCinema(int id, [FromBody]AddCinema cinema)
        {
            try
            {
                return Ok(new
                {
                    result=cinemaService.UpdateCinema(id,cinema),
                    Message="Update Cinema Successfully"
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("GetCinema")]
        [Authorize(Policy ="SuperAdmin")]
        public IActionResult GetCinema()
        {
            try
            {
                return Ok(cinemaService.GetCinema());
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("AddCinema")]
        [Authorize(Policy = "SuperAdmin")]
        public IActionResult CreateCinema([FromBody]AddCinema addCinema)
        {
            try
            {
                return Ok(new
                {
                    result = cinemaService.CreateCineme(addCinema),
                    Message = "Create Cinema Successfully"
                });
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
