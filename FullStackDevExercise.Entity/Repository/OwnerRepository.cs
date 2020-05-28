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
      (@fname, @lname);
      select last_insert_rowid();"
      , new { @fname = data.first_name, @lname = data.last_name });

      var result = await Connection.ExecuteScalarAsync<int>(commandDefinition);

      data.id = result;

      return result;
    }

    public override async Task<bool> UpdateAsync(OwnerEntity data)
    {
      if (data == null) return false;

      var commandDefinition = new CommandDefinition(
      @$"UPDATE [{tableName}]
        SET
          [{nameof(OwnerEntity.first_name)}] = @fname,
          [{nameof(OwnerEntity.last_name)}] = @lname
        WHERE [{nameof(OwnerEntity.id)}] = @id;
        "
      , new { @fname = data.first_name, @lname = data.last_name, @id = data.id });

      var result = await Connection.ExecuteAsync(commandDefinition);

      return result == 1;
    }
  }
}
