using CinameManageMent.Data;
using CinameManageMent.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Net.Mail;
using System.Net;

namespace CinameManageMent.Services
{
    public class OrderServiceImpl : OrderService
    {
        private readonly DatabaseContext _databaseContext;
        public OrderServiceImpl(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        private string GenerateOrderCode()
        {
            
            return "ORD-" + Guid.NewGuid().ToString("N").Substring(0, 8).ToUpper();
        }
        private void SendEmail(string to, string subject, string body)
        {
            using (var client = new SmtpClient("smtp.gmail.com"))
            {
                client.Port = 587;
                client.Credentials = new NetworkCredential("tranp6648@gmail.com", "akly huwn xldc aiix");
                client.EnableSsl = true;
                var message = new MailMessage
                {
                    From = new MailAddress("tranp6648@gmail.com"),
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = true
                };
                message.To.Add(to);
                client.Send(message);
            }
        }
        public string CreateOrder(CreateOrder createOrder)
        {
            try
            {
                var orderCode = GenerateOrderCode();
                if (createOrder.ComboOrder != null)
                {
                    var sql = "EXEC CreateOrder @OrderCode,@TotalPrice,@idAccount,@idshowtime";
                    var parameters = new[]
                    {
                        new SqlParameter("@OrderCode",orderCode),
                        new SqlParameter("@TotalPrice",createOrder.TotaPrice),
                           new SqlParameter("@idAccount", createOrder.idAccount),
                           new SqlParameter("@idshowtime",createOrder.idShowtime)
                    };
                 var result= _databaseContext.Orders.FromSqlRaw(sql, parameters).AsEnumerable()
    .Select(a => a.Id)
    .FirstOrDefault();
                    foreach(var ticket in createOrder.Ticket)
                    {
                        var sqlUpdateSeat = "EXEC UpdateStatusSeat @IdShowtime,@Idseat";
                        var paramtersUpdateseat = new[]
                        {
                            new SqlParameter("@IdShowtime",createOrder.idShowtime),
                            new SqlParameter("@Idseat",ticket.idSeat)
                        };
                        _databaseContext.Database.ExecuteSqlRaw(sqlUpdateSeat,paramtersUpdateseat);
                        var sqlTicket = "Exec CreatOrderTicket @IdOrder,@idticket,@price";
                        var parametersTicket = new[]
                        {
                            new SqlParameter("@IdOrder",result),
                            new SqlParameter("@idticket",ticket.idSeat
                            ),
                            new SqlParameter("@price",ticket.price)
                        };
                        _databaseContext.Database.ExecuteSqlRaw(sqlTicket, parametersTicket);
                    }
                    foreach(var combo in createOrder.ComboOrder)
                    {
                        var sqlcombo = "EXEC CreateComboOrder @IdOrder,@ComboId,@price,@Quantity";
                        var parametersCombo = new[]
                        {
                            new SqlParameter("@IdOrder",result),
                            new SqlParameter("@ComboId",combo.idCombo),
                            new SqlParameter("@price",combo.price),
                           new SqlParameter ("@Quantity",combo.Quantity)
                        };
                        _databaseContext.Database.ExecuteSqlRaw(sqlcombo, parametersCombo);
                    }
                  
                }
                else
                {
                    var sql = "EXEC CreateOrder @OrderCode,@TotalPrice,@idAccount,@idshowtime";
                    var parameters = new[]
                    {
                        new SqlParameter("@OrderCode",orderCode),
                        new SqlParameter("@TotalPrice",createOrder.TotaPrice),
                           new SqlParameter("@idAccount", createOrder.idAccount),
                           new SqlParameter("@idshowtime",createOrder.idShowtime)
                    };
                    var result = _databaseContext.Orders.FromSqlRaw(sql, parameters).AsEnumerable()
       .Select(a => a.Id)
       .FirstOrDefault();
                    foreach (var ticket in createOrder.Ticket)

                    {
                        var sqlUpdateSeat = "EXEC UpdateStatusSeat @Idseat";
                        var paramtersUpdateseat = new[]
                        {
                            new SqlParameter("@Idseat",ticket.idSeat)
                        };
                        _databaseContext.Database.ExecuteSqlRaw(sqlUpdateSeat, paramtersUpdateseat);
                        var sqlTicket = "Exec CreatOrderTicket @IdOrder,@idticket,@price";
                        var parametersTicket = new[]
                        {
                            new SqlParameter("@IdOrder",result),
                            new SqlParameter("@idticket",ticket.idSeat
                            ),
                            new SqlParameter("@price",ticket.price)
                        };
                        _databaseContext.Database.ExecuteSqlRaw(sqlTicket, parametersTicket);
                    }

                }
                SendEmail(createOrder.Email, "Order successful", $"Dear customer,\n\nThank you for your order. Your order ID is {orderCode}. "+ "We will process your order and send the bill soon.\n\nRegards,\nYour Store Team");
                return orderCode;
            }
            catch
            {
                return null;
            }
        }

        public dynamic GetOrderByAdmin(int id)
        {
            return _databaseContext.Orders.FromSqlRaw("Select * From dbo.OrderByAdmin({0})", id);
        }

        public bool UpdateOrderStatus(string email,int id)
        {
            try
            {
                var result = 0;
                var sql = "EXEC UpdateStatusOrder @Id";
                var parameters = new[]
                {
                    new SqlParameter("@Id",id)
                };
                result=_databaseContext.Database.ExecuteSqlRaw(sql, parameters);
                SendEmail(email, "Order Confirmation Successful", "Đơn hàng của bạn đã thanh toán thành công hãy xem thông tin vé trong tài khoản của bạn");
                return result > 0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic GetAccountDetailOrder(int id)
        {
            return _databaseContext.Accounts.FromSqlRaw("Select * From dbo.GetAccountOrder({0})", id).FirstOrDefault();
        }

        public dynamic GetSeatDetailOrder(int id)
        {
            return _databaseContext.TicketOrders.FromSqlRaw("Select * From dbo.GetSeatDetailOrder({0})", id).Select(d => new
            {
                name = _databaseContext.DetailSeats.Where(a => a.Id == d.IdSeat).Select(a => new
                {
                    Nameseat=a.name,
                    CategorySeat=a.CategorySeat.Name,
                }).FirstOrDefault(),
                price=d.Price
            }).ToList();
        }

        public dynamic GetComboSeatDetail(int id)
        {
            return _databaseContext.DetailOrderCombos.FromSqlRaw("Select * From dbo.GetComboDetailOrder({0})", id).Select(d => new
            {
                name = _databaseContext.Combos.Where(a => a.id == d.comboid).Select(a => new
                {
                    Comboname = a.name,

                }).FirstOrDefault(),
                price=d.Price
            }).ToList();
        }

        public int CountOrder()
        {
            return _databaseContext.Orders.Count();
        }
        public dynamic OrderDesc()
        {
            return _databaseContext.Orders
                      .Where(a => a.Account.Id == 2)
                      .OrderByDescending(a => a.Id)
                      .Take(3)
                      .Select(d => new
                      {
                          Username = d.Account.Username,
                          Ordercount = _databaseContext.Orders.Count(o => o.Account.Id == d.Account.Id), 
                          FullName = d.Account.FullName
                      })
                      .ToList();
        }


        public dynamic GetCoutorder(int datetime)
        {
            return _databaseContext.Orders.Where(p => p.OrderDate.Month == datetime)
           .GroupBy(o => o.OrderDate.Date)

           .Select(g => new { OrderDate = g.Key, OrderCount = g.Count() })
           .OrderBy(x => x.OrderDate)
           .ToList();
        }

        public bool ConfirmTransfer(string orderCode)
        {
            try
            {
                var result = 0;
                var sql = "EXEC ConfirmTranfer @CodeOrder";
                var parameters = new[]
              {
                    new SqlParameter("@CodeOrder",orderCode)
                };
                result = _databaseContext.Database.ExecuteSqlRaw(sql, parameters);
                return true;

            }
            catch
            {
                return false;
            }
        }

        public dynamic HistoryOrder(int id)
        {
            return _databaseContext.Orders.Where(d => d.IdAccount == id).Select(d => new
            {
                id=d.Id,
                Title=d.ShowTime.Movie.Title,
                Image=d.ShowTime.Movie.Picture,
                seatname = _databaseContext.TicketOrders.Where(a => a.OrderId == d.Id).Select(a => new
                {
                    seat = _databaseContext.DetailSeats.Where(b => b.Id == a.IdSeat).Select(e => new
                    {
                        nameseat=e.name,
                        categoryseat=e.CategorySeat.Name
                    }).ToList()
                }).ToList(),
                Time=d.ShowTime.StartDate,
                totalprice=d.TotalPrice,
                status=d.status
            }).ToList();
        }

        public int CountOrderAdmin(int id)
        {
            return _databaseContext.Orders.Where(d=>_databaseContext.ShowTime.Any(a=>a.Id==d.ShowTimeId && _databaseContext.Screen.Any(e=>e.Id==a.IdScreen && e.Cinema.IdManager==id))).Count();
        }

        public dynamic SeatOrderReject(int id)
        {
            return _databaseContext.TicketOrders.Where(d => d.OrderId == id).Select(d => new
            {
                idseat=d.IdSeat
            }).ToList();
        }

        public bool RejectOrder(int id,RejeOrder rejects)
        {
            try
            {
                var sql = "EXEC RejectOrder @id";
                var parameters = new[]
                {
                    new SqlParameter("@id",id)
                };
                var result=_databaseContext.Database.ExecuteSqlRaw(sql, parameters);
                foreach(var reject in rejects.RejectOrders)
                {
                    var sqlreject = "EXEC UpdateSeat @id,@idshowtime";
                    var paramtersreject = new[]
                    {
                        new SqlParameter("@id",reject.idseat),
                        new SqlParameter("@idshowtime",reject.idshowtime),
                    };
                    _databaseContext.Database.ExecuteSqlRaw(sqlreject, paramtersreject);
                }
                return true;
            }
            catch
            {
                return false;
            }
        }

        public dynamic GetCoutOrderAdmin(int datetime, int id)
        {
            return _databaseContext.Orders.Where(d => d.OrderDate.Month == datetime && _databaseContext.ShowTime.Any(a => a.Id == d.ShowTimeId && _databaseContext.Screen.Any(e => e.Id == a.IdScreen && e.Cinema.IdManager == id)))
            .GroupBy(o => o.OrderDate.Date)

            .Select(g => new { OrderDate = g.Key, OrderCount = g.Count() })
            .OrderBy(x => x.OrderDate)
            .ToList();
        }
    }
}
