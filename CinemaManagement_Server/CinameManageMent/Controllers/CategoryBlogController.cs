using CinameManageMent.Data;
using CinameManageMent.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CinameManageMent.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryBlogController : ControllerBase
    {
        private readonly CategoryBlogService categoryBlogService;
        public CategoryBlogController(CategoryBlogService categoryBlogService)
        {
            this.categoryBlogService = categoryBlogService;
        }
        [HttpGet("GetCategoryBlog")]
        public IActionResult GetCategoryBlog()
        {
            try
            {
                return Ok(categoryBlogService.GetCategory());
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("CreateCategoryBlog")]
        public IActionResult CreateCategoryBlog([FromBody] AddCategoryBlog addCategoryBlog)
        {
            try
            {
                return Ok(new
                {
                    result=categoryBlogService.CreateCategoryBlog(addCategoryBlog),
                    Message="Create Category Blog Successfully"
                });
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
