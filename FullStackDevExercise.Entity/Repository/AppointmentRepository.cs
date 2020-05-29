using Dapper;
using FullStackDevExercise.Data.Entity;
using System;
using System.Data;
using System.Threading.Tasks;

namespace FullStackDevExercise.Data.Repository
{
  public class AppointmentRepository : BaseRepository<AppointmentEntity>, IAppointmentRepository
  {
    public AppointmentRepository(IDbConnection connection) : base("appointments", connection)
    {
    }

    public override async Task<int> InsertAsync(AppointmentEntity data)
    {
      if (data == null) return 0;

      var commandDefinition = new CommandDefinition(
      @$"INSERT INTO [{tableName}]
      ([{nameof(AppointmentEntity.pet_id)}],[{nameof(AppointmentEntity.slot_from)}],[{nameof(AppointmentEntity.slot_to)}],[{nameof(AppointmentEntity.notes)}])
      VALUES
      (@fname, @lname);
      select last_insert_rowid();"
      , new { @pet_id = data.pet_id, @slot_from= data.slot_from, @slot_to=data.slot_to, @notes=data.notes});

      var result = await Connection.ExecuteScalarAsync<int>(commandDefinition);

      data.id = result;

      return result;
    }

    public override Task<bool> UpdateAsync(AppointmentEntity data)
    {
      throw new NotImplementedException();
    }    
  }
}
