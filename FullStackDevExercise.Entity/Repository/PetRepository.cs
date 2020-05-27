using FullStackDevExercise.Data.Entity;
using System.Data;
using System.Threading.Tasks;

namespace FullStackDevExercise.Data.Repository
{
  public class PetRepository : BaseRepository<PetEntity>, IPetRepository
  {
    public PetRepository(IDbConnection connection) : base("pets", connection)
    {
    }

    public override Task<int> InsertAsync(PetEntity data)
    {
      throw new System.NotImplementedException();
    }

    public override Task<bool> UpdateAsync(PetEntity data)
    {
      throw new System.NotImplementedException();
    }
  }
}
