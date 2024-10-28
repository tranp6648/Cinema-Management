using CinameManageMent.Data;
using CinameManageMent.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CinameManageMent.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly BlogService blogService;
        public BlogController(BlogService blogService)
        {
            this.blogService = blogService;
        }
        [HttpGet("CountBlog")]
        [Authorize(Policy = "AdminOrSuperAdmin")]
        public IActionResult CountBlog()
        {
            return Ok(blogService.CountBlog());
        }
        [HttpGet("DetailBlog/{id}")]
        public IActionResult DetailBlog(int id)
        {
            try
            {
                return Ok(blogService.DetailBlog(id));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("GetBlogStatus")]
        public IActionResult GetBlogStatus()
        {
            try
            {
                return Ok(blogService.GetBlogStatus());
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
                    result = blogService.UpdateDescriptionMovie(id, updateDescription),
                    Message = "Update Description Success"
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut("UpdateStatus/{id}")]
        public IActionResult UpdateStatus(int id, [FromBody] UpdateStatus updateStatus)
        {
            try
            {
                return Ok(blogService.UpdateStatus(id, updateStatus));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("GetBlog")]
        public IActionResult GetBlog()
        {
            try
            {
                return Ok(blogService.GetBlog());
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut("UpdateBlog/{id}")]
        [Authorize(Policy = "AdminOrSuperAdmin")]
        public IActionResult UpdateBlog(int id, [FromForm] UpdateBlog updateBlog)
        {
            try
            {
                return Ok(new
                {
                    result = blogService.Updateblog(id, updateBlog),
                    Message="Update Blog Successfully"
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("CreateBlog")]
        [Authorize(Policy = "AdminOrSuperAdmin")]
        public IActionResult CreateBlog([FromForm]AddBlog addBlog)
        {
            try
            {
                return Ok(new
                {
                    result=blogService.CreateBlog(addBlog),
                    Message="Create Blog Successfully"
                });
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
