using CinameManageMent.Data;

namespace CinameManageMent.Services
{
    public interface ActorService
    {
        public bool AddActor(AddActor addActor);
        public dynamic getActor();
        public bool UpdateActor(int id,UpdateActor updateActor);
        public bool DeleteActor(int id);  
        public dynamic GetActorNotin(int id);
    }
}
