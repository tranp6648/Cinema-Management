using CinameManageMent.Data;
using CinameManageMent.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CinameManageMent.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComboItemController : ControllerBase
    {
        private readonly ComboItemService comboItemService;
        public ComboItemController(ComboItemService comboItemService)
        {
            this.comboItemService = comboItemService;
        }
        [HttpPut("UpdateComboItem/{id}")]
        public IActionResult UpdateComboItem(int id, [FromBody] UpdateCombo updateCombo)
        {
            try
            {
                return Ok(new
                {
                    result = comboItemService.UpdateCombo(id, updateCombo),
                    Message = "Update Comboitem success"
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("GetComboItem")]
        public IActionResult GetComboItem()
        {
            try
            {
                return Ok(comboItemService.GetComboItem());
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("CreateCombo")]
        public IActionResult CreateCombo([FromBody]AddCombo addCombo)
        {
            try
            {
                return Ok(new
                {
                    result=comboItemService.AddCombo(addCombo),
                    Message="Create Combo Success"
                });
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
