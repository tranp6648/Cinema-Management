using CinameManageMent.Data;
using CinameManageMent.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CinameManageMent.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly OrderService orderService;
        public OrderController(OrderService orderService)
        {
            this.orderService = orderService;
        }
        [HttpGet("GetAccountDetailOrder/{id}")]
        [Authorize(Policy = "AdminOrSuperAdmin")]
        public IActionResult GetAccountDetailOrder(int id)
        {
            try
            {
                return Ok(orderService.GetAccountDetailOrder(id));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("HistoryOrder/{id}")]
        public IActionResult HistoryOrder(int id)
        {
            return Ok(orderService.HistoryOrder(id));
        }
        [HttpGet("GetCoutOrderAdmin/{datetime}/{id}")]
        public IActionResult GetCountOrderAdmin(int datetime,int id)
        {
            try
            {
                return Ok(orderService.GetCoutOrderAdmin(datetime,id));
            }
            catch
            {
                return BadRequest();
            }
        }
        
        [HttpPut("TranferOrder/{order}")]
        public IActionResult TranferOrder(string order)
        {
            try
            {
                return Ok(orderService.ConfirmTransfer(order));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("RejectOrder/{id}")]
        public IActionResult RejectOrder(int id,RejeOrder rejectOrders)
        {
            try
            {
                return Ok(orderService.RejectOrder(id, rejectOrders));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("SeatOrderReject/{id}")]
        public IActionResult SeatOrderReject(int id)
        {
            return Ok(orderService.SeatOrderReject(id));
        }
        [HttpGet("CountOrderAdmin/{id}")]
        public IActionResult CountOrderAdmin(int id)
        {
            return Ok(orderService.CountOrderAdmin(id));
        }
        [HttpGet("OrderDesc")]
        [Authorize(Policy ="SuperAdmin")]
        public IActionResult OrderDesc()
        {
            return Ok(orderService.OrderDesc());
        }
        [HttpGet("GetCoutorder/{datetime}")]
        [Authorize(Policy = "SuperAdmin")]
        public IActionResult GetCoutorder(int datetime)
        {
            try
            {
                return Ok(orderService.GetCoutorder(datetime));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpGet("CountOrder")]
        [Authorize(Policy = "SuperAdmin")]
        public IActionResult CountOrder()
        {
            try
            {
                return Ok(orderService.CountOrder());
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("GetComboSeatDetail/{id}")]
        [Authorize(Policy = "AdminOrSuperAdmin")]
        public IActionResult GetComboSeatDetail(int id)
        {
            try
            {
                return Ok(orderService.GetComboSeatDetail(id));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("GetSeatDetailOrder/{id}")]
        [Authorize(Policy = "AdminOrSuperAdmin")]
        public IActionResult GetSeatDetailOrder(int id)
        {
            try
            {
                return Ok(orderService.GetSeatDetailOrder(id));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut("UpdateOrderStatus/{email}/{id}")]
        [Authorize(Policy ="Admin")]
        public IActionResult UpdateOrderStatus(string email,int id)
        {
            try
            {
                return Ok(new
                {
                    result = orderService.UpdateOrderStatus(email, id),
                    Message = "Order Confirmation Successful"
                });
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("GetOrderAdmin/{id}")]
        [Authorize(Policy ="Admin")]
        public IActionResult GetOrderAdmin(int id)
        {
            try
            {
                return Ok(orderService.GetOrderByAdmin(id));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("CreateOrder")]
        public IActionResult CreateOrder([FromBody]CreateOrder createOrder)
        {
            try
            {
                return Ok(new
                {
                    result= orderService.CreateOrder(createOrder),
                    Message= "Order successful"
                });
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
