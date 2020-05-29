using Dapper;
using FullStackDevExercise.Data.Entity;
using System;
using System.Collections.Generic;
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
      , new { @pet_id = data.pet_id, @slot_from = data.slot_from, @slot_to = data.slot_to, @notes = data.notes });

      var result = await Connection.ExecuteScalarAsync<int>(commandDefinition);

      data.id = result;

      return result;
    }

    public async Task<IEnumerable<AppointmentEntity>> GetByDate(int year, int month, int date)
    {
      var result = await Connection.QueryAsync<AppointmentEntity>(
      $@"SELECT
        a.*,
        p.{nameof(PetEntity.id)} as {nameof(AppointmentEntity.pet_id)},
        p.{nameof(PetEntity.type)} as {nameof(AppointmentEntity.pet_type)},
        p.{nameof(PetEntity.name)} as {nameof(AppointmentEntity.pet_name)},
        p.{nameof(PetEntity.age)} as {nameof(AppointmentEntity.pet_age)},
        
        o.{nameof(OwnerEntity.id)} as {nameof(AppointmentEntity.owner_id)},
        o.{nameof(OwnerEntity.first_name)} as {nameof(AppointmentEntity.owner_first_name)},
        o.{nameof(OwnerEntity.last_name)} as {nameof(AppointmentEntity.owner_last_name)}
      FROM {tableName} a
      		INNER JOIN [pets] p ON p.id = a.pet_id
		      INNER JOIN [owners] o ON o.id = p.owner_id
      WHERE a.[{nameof(AppointmentEntity.slot_from)}] LIKE @dateValue",
      new { @dateValue = $"{year}-{PadZero(month + 1)}-{PadZero(date)}%" }
      );

      return result;
    }

    private string PadZero(int number) => number.ToString("D2");

    public override Task<bool> UpdateAsync(AppointmentEntity data)
    {
      throw new NotImplementedException();
    }
  }
}
