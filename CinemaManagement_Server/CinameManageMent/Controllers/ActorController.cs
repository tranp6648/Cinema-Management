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
    public class ActorController : ControllerBase
    {
        private readonly ActorService actorService;
        private readonly DatabaseContext databaseContext;
        public ActorController(ActorService actorService,DatabaseContext databaseContext) { 
        this.actorService = actorService;
            this.databaseContext = databaseContext;
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
        [HttpGet("CountActor")]
        [Authorize(Policy ="SuperAdmin")]
        public IActionResult CountOrder()
        {
            try
            {
                return Ok(actorService.CountActor());
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
                if(databaseContext.DetailActorMovies.Any(d=>d.IdActor==id))
                {
                    return BadRequest(new { message = "Actor Delete Failed. Actor is associated with movies." });
                }
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
        [HttpPut("UpdateDescription/{id}")]
        public IActionResult UpdateDescription(int id, [FromBody] UpdateDescription updateDescription)
        {
            try
            {
                return Ok(new
                {
                    result = actorService.UpdateDescriptionMovie(id, updateDescription),
                    Message = "Update Description Success"
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
      
        [HttpGet("GetDetailActor/{id}")]
        public IActionResult GetDetailActor(int id)
        {
            try
            {
                return Ok(actorService.GetDetailActor(id));
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
                if (databaseContext.Actors.Any(d => d.Name == updateActor.Name))
                {
                    return BadRequest(new { message = "Name already exists" });
                }
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
                if(databaseContext.Actors.Any(d=>d.Name==addActor.Name)) {
                    return BadRequest(new { message = "Name already exists" });
                }
             
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
