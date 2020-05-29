using Dapper;
using FullStackDevExercise.Data.Entity;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace FullStackDevExercise.Data.Repository
{
  public class PetRepository : BaseRepository<PetEntity>, IPetRepository
  {
    public PetRepository(IDbConnection connection) : base("pets", connection)
    {
    }

    public Task<IEnumerable<PetEntity>> GetByOwnerIdAsync(long ownerId)
    {
      var command = new CommandDefinition(
        $"SELECT * FROM {tableName} WHERE [{nameof(PetEntity.owner_id)}] = @ownerId",
        new { @ownerId = ownerId }
      );

      return Connection.QueryAsync<PetEntity>(command);
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
