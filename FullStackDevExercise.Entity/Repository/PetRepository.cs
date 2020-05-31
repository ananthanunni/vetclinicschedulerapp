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

    public override async Task<int> InsertAsync(PetEntity data)
    {
      if (data == null) return 0;

      var commandDefinition = new CommandDefinition(
      @$"INSERT INTO [{tableName}]
      ([{nameof(PetEntity.owner_id)}],[{nameof(PetEntity.name)}],[{nameof(PetEntity.type)}],[{nameof(PetEntity.age)}])
      VALUES
      (@ownerId, @name, @type, @age);
      select last_insert_rowid();"
      , new { @ownerId = data.owner_id, @name = data.name, @type = data.type, @age = data.age });

      var result = await Connection.ExecuteScalarAsync<int>(commandDefinition);

      data.id = result;

      return result;
    }

    public override async Task<bool> UpdateAsync(PetEntity data)
    {
      if (data == null) return false;

      var commandDefinition = new CommandDefinition(
      @$"UPDATE [{tableName}]
      SET
        [{nameof(PetEntity.owner_id)}] = @ownerId,
        [{nameof(PetEntity.name)}] = @name,
        [{nameof(PetEntity.type)}] = @type,
        [{nameof(PetEntity.age)}] = @age
      WHERE
        [{nameof(data.id)}] = @id
      "
      , new { @id = data.id, @ownerId = data.owner_id, @name = data.name, @type = data.type, @age = data.age });

      var result = await Connection.ExecuteAsync(commandDefinition);

      return result == 1;
    }
  }
}
