using CinameManageMent.Data;
using CinameManageMent.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CinameManageMent.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private MovieService movieService;
        public MovieController(MovieService movieService)
        {
            this.movieService = movieService;
        }
        [HttpPost("AddActorMovie")]
        public IActionResult AddActorMovie([FromBody] ActorMovieDTO actorMovieDTO)
        {
            try
            {
                return Ok(new
                {
                    result= movieService.AddActorMovie(actorMovieDTO),
                    Message="Add Actor Successfully"
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut("UpdateDescription/{id}")]
        public IActionResult UpdateDescription(int id, [FromBody]UpdateDescription updateDescription)
        {
            try
            {
                return Ok(new
                {
                    result = movieService.UpdateDescriptionMovie(id, updateDescription),
                    Message = "Update Description Success"
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("DetailActorMovie/{id}")]
        public IActionResult DetailActorMovie(int id)
        {
            try
            {
                return Ok(movieService.DetailActor(id));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("DetailMovie/{id}")]
        public IActionResult DetailMovie(int id)
        {
            try
            {
                return Ok(movieService.DetailMovie(id));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut("UpdateMovie/{id}")]
        [Authorize(Policy = "SuperAdmin")]
        public IActionResult UpdateMovie(int id, [FromBody] UpdateMovieDto updateMovieDto)
        {
            try
            {
                return Ok(new
                {
                    result= movieService.UpdateMovie(id, updateMovieDto),
                    Message="Update Movie Success"
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("GetMovie")]
       
        public IActionResult GetMovie()
        {
            try
            {
                return Ok(movieService.GetMovie());
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("AddMovie")]
        [Authorize(Policy = "AdminOrSuperAdmin")]
        public IActionResult AddMovie([FromForm]MovieDto movie)
        {
            try
            {
                return Ok(new
                {
                    result=movieService.AddMovie(movie),
                    Message="Create Movie Successfully"
                });
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
