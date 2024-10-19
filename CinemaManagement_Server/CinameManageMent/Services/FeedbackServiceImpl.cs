using CinameManageMent.Data;
using CinameManageMent.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace CinameManageMent.Services
{
    public class FeedbackServiceImpl : FeedBackService
    {
        private readonly DatabaseContext databaseContext;
        public FeedbackServiceImpl(DatabaseContext databaseContext)
        {
            this.databaseContext = databaseContext;
        }

        public dynamic AvgFeedback(int id)
        {
            return databaseContext.Feedbacks.Where(d => d.IdMovie == id).Average(d=>d.RatingComment);
        }

        public bool CreateFeedback(AddFeedback addFeedback)
        {
            try
            {
                var sql = "EXEC FeedbackRating @Comment,@RatingComment,@IdMovie,@IdAccount";
                var parameters = new[]
                {
                    new SqlParameter("@Comment",addFeedback.Comment),
                    new SqlParameter("@RatingComment",addFeedback.RatingComment),
                    new SqlParameter("@IdMovie",addFeedback.idMovie),
                    new SqlParameter("@IdAccount",addFeedback.IdAccount)
                };
                var result = databaseContext.Database.ExecuteSqlRaw(sql, parameters);
                return result > 0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic GetFeedback(int id)
        {
            return databaseContext.Feedbacks.FromSqlRaw("Select * From dbo.GetFeedback({0})",id).ToList();
        }
    }
}
