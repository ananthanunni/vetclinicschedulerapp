using FullStackDevExercise.Data.Entity;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FullStackDevExercise.Data.Repository
{
  public interface IAppointmentRepository : IRepository<AppointmentEntity>
  {
    Task<IEnumerable<AppointmentEntity>> GetByDate(int year, int month, int date);
  }
}
