using CinameManageMent.Data;

namespace CinameManageMent.Services
{
    public interface FeedBackService
    {
        public bool CreateFeedback(AddFeedback addFeedback);
        public dynamic GetFeedback(int id);
        public dynamic AvgFeedback(int id);
    }
}
