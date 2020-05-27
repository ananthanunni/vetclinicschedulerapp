using Dapper;
using FullStackDevExercise.Data.Entity;
using System.Data;
using System.Threading.Tasks;

namespace FullStackDevExercise.Data.Repository
{
  public class OwnerRepository : BaseRepository<OwnerEntity>, IOwnerRepository
  {
    public OwnerRepository(IDbConnection connection) : base("owners", connection)
    {
    }

    public override async Task<int> InsertAsync(OwnerEntity data)
    {
      if (data == null) return 0;

      var commandDefinition = new CommandDefinition(
      @$"INSERT INTO [{tableName}]
      ([{nameof(OwnerEntity.first_name)}],[{nameof(OwnerEntity.last_name)}])
      VALUES
      (@fname, @lname)"
      , new { @fname = data.first_name, @lname = data.last_name });

      var result = await Connection.ExecuteAsync(commandDefinition);
      return result;
    }

    public override Task<bool> UpdateAsync(OwnerEntity data)
    {
      throw new System.NotImplementedException();
    }
  }
}
