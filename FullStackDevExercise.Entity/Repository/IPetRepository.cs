using FullStackDevExercise.Data.Entity;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FullStackDevExercise.Data.Repository
{
  public interface IPetRepository : IRepository<PetEntity>
  {
    Task<IEnumerable<PetEntity>> GetByOwnerIdAsync(long ownerId);
  }
}
