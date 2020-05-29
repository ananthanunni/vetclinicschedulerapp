using FullStackDevExercise.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FullStackDevExercise.Services
{
  public interface IAppointmentService
  {
    Task<IEnumerable<AppointmentViewModel>> GetByDate(int year, int month, int date);
  }
}