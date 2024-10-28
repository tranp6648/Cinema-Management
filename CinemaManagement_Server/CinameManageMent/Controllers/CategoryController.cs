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
        private readonly DatabaseContext databaseContext;
        public CategoryController(CategoryService categoryService, DatabaseContext databaseContext)
        {
            _categoryService = categoryService;
            this.databaseContext = databaseContext;
        }
        [HttpGet("CountCategory")]
        [Authorize(Policy ="SuperAdmin")]
        public IActionResult CountCategory()
        {
            return Ok(_categoryService.CountCategory());
        }
        [HttpDelete("DeleteCategory/{id}")]
        [Authorize(Policy ="SuperAdmin")]
        public IActionResult DeleteCategory(int id)
        {
            try
            {
                if(databaseContext.DetailCategoryMovies.Any(d=>d.IdCategory==id)) {
                    return BadRequest(new { message = "Category Delete Failed. Category is associated with movies." });
                }
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
                if(databaseContext.Categories.Any(d=>d.Name==addCategory.Name))
                {
                    return BadRequest(new { message = "Name already exists" });
                }
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
                if (databaseContext.Categories.Any(d => d.Name == category.Name))
                {
                    return BadRequest(new { message = "Name already exists" });
                }
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
