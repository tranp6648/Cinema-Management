using CinameManageMent.Data;
using CinameManageMent.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CinameManageMent.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly FeedBackService feedBackService;
        public FeedbackController(FeedBackService feedBackService)
        {
            this.feedBackService = feedBackService;
        }
        [HttpGet("AvgFeedback/{id}")]
        public IActionResult AvgFeedback(int id)
        {
            try
            {
                return Ok(feedBackService.AvgFeedback(id));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("GetFeedback/{id}")]
        public IActionResult GetFeedback(int id)
        {
            try
            {
                return Ok(feedBackService.GetFeedback(id));
            }
            catch
            {
                return BadRequest();    
            }
        }
        [HttpPost("CreateFeedback")]
        public IActionResult CreateFeedback([FromBody]AddFeedback addFeedback)
        {
            try
            {
                return Ok(new
                {
                    result = feedBackService.CreateFeedback(addFeedback),
                    Message = " Feedback Successfully"
                });
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
