using CinameManageMent.Data;
using CinameManageMent.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CinameManageMent.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly ItemService _itemService;
        public ItemController(ItemService itemService)
        {
            _itemService = itemService;
        }
        [HttpGet("GetItem")]
        public IActionResult GetItem()
        {
            try
            {
                return Ok(_itemService.GetItem());
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("CreateItem")]
        public IActionResult CreateItem([FromBody]CreateItem createItem)
        {
            try
            {
                return Ok(new
                {
                    result=_itemService.CreateItem(createItem),
                    Message = "Create Item Success"
                });;
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
