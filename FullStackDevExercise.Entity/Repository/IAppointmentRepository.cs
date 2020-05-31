using FullStackDevExercise.Data.Entity;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FullStackDevExercise.Data.Repository
{
  public interface IAppointmentRepository : IRepository<AppointmentEntity>
  {
    Task<IEnumerable<AppointmentEntity>> GetByDate(int year, int month, int date);
    Task<Dictionary<DateTime, int>> GetMonthlySummary(int year, int month);
  }
}
