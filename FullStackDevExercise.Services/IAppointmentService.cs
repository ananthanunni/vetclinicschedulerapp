using FullStackDevExercise.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FullStackDevExercise.Services
{
  public interface IAppointmentService
  {
    Task<IEnumerable<AppointmentViewModel>> GetByDate(int year, int month, int date);
    Task<IEnumerable<MonthlyAppointmentSummaryViewModel>> GetMonthSummary(int year, int month);
    Task<AppointmentViewModel> Save(AppointmentViewModel appointment);
    Task<AppointmentViewModel> GetById(int id);
    Task<bool> DeleteAsync(long id);
  }
}
