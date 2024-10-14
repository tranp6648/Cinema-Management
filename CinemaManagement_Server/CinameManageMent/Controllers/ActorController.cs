using CinameManageMent.Data;
using CinameManageMent.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CinameManageMent.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActorController : ControllerBase
    {
        private readonly ActorService actorService;
        public ActorController(ActorService actorService) { 
        this.actorService = actorService;
        }
        [HttpGet("GetActorNotIn/{id}")]
        public IActionResult GetActorNotIn(int id)
        {
            try
            {
                return Ok(actorService.GetActorNotin(id));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpDelete("DeleteActor/{id}")]
        [Authorize(Policy ="SuperAdmin")]
        public IActionResult DeleteActor(int id)
        {
            try
            {
                return Ok(new
                {
                    message = "Delete Actor Successfully",
                    result = actorService.DeleteActor(id)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("GetActor")]
        [Authorize(Policy = "SuperAdmin")]
        public IActionResult GetActor()
        {
            try
            {
                return Ok(actorService.getActor());
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut("UpdateActor/{id}")]
        [Authorize(Policy ="SuperAdmin")]
        public IActionResult UpdateAvator(int id, [FromForm] UpdateActor updateActor)
        {
            try
            {
                return Ok(new
                {
                    Message = "Update Actor Successfully",
                    result = actorService.UpdateActor(id, updateActor)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("AddActor")]
        [Authorize(Policy ="SuperAdmin")]
        public IActionResult AddActor([FromForm] AddActor addActor)
        {
            try
            {
                return Ok(new
                {
                    result=actorService.AddActor(addActor),
                    Message="Create Actor Success"
                });
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
