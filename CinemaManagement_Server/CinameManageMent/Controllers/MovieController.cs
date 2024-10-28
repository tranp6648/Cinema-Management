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
    public class MovieController : ControllerBase
    {
        private MovieService movieService;
        private DatabaseContext databaseContext;
        public MovieController(MovieService movieService,DatabaseContext databaseContext)
        {
            this.movieService = movieService;
            this.databaseContext = databaseContext;
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
        [HttpGet("GetMovieStatus")]
        public IActionResult GetMovieStatus()
        {
            return Ok(movieService.GetMovieStatus());
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
        [HttpPut("UpdateStatus/{id}")]
        [Authorize(Policy ="SuperAdmin")]
        public IActionResult UpdateStatus(int id, [FromBody] UpdateStatus updateStatus)
        {
            try
            {
                return Ok(movieService.UpdateStatus(id, updateStatus));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("CountMovie")]
        [Authorize(Policy ="SuperAdmin")]
        public IActionResult CountMovie()
        {
            return Ok(movieService.CountMovie());
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
        public IActionResult UpdateMovie(int id, [FromForm] UpdateMovieDto updateMovieDto)
        {
            try
            {
                if(databaseContext.Movies.Any(d=>d.Title == updateMovieDto.Title))
                {
                    return BadRequest(new { message = "Title already exists" });
                }
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
                if (databaseContext.Movies.Any(d => d.Title == movie.Title))
                {
                    return BadRequest(new { message = "Tittle already exists" });
                }
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
