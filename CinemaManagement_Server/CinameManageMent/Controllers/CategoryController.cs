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
    public class CategoryController : ControllerBase
    {
        private readonly CategoryService _categoryService;
        public CategoryController(CategoryService categoryService)
        {
            _categoryService = categoryService;
        }
        [HttpDelete("DeleteCategory/{id}")]
        [Authorize(Policy ="SuperAdmin")]
        public IActionResult DeleteCategory(int id)
        {
            try
            {
                return Ok(_categoryService.DeleteCategory(id));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut("UpdateCategory/{id}")]
        [Authorize(Policy = "SuperAdmin")]

        public IActionResult UpdateCategory(int id, [FromBody] AddCategory addCategory)
        {
            try
            {
                return Ok(new
                {
                    Message = "Updated category successfully",
                    result = _categoryService.UpdateCategory(id,addCategory)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("GetCategory")]
        [Authorize(Policy ="SuperAdmin")]
        public IActionResult GetCategory()
        {
            try
            {
                return Ok(_categoryService.GetCategory());
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("Add")]
        [Authorize(Policy ="SuperAdmin")]
        public IActionResult GetCategory([FromBody]AddCategory category)
        {
            try
            {
                return Ok(new
                {
                    Message = "Added category successfully",
                    result=_categoryService.AddCategory(category)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
