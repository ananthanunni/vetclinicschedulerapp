using FullStackDevExercise.Data.Repository;
using FullStackDevExercise.ViewModels;
using FullStackDevExercise.ViewModels.Codec;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FullStackDevExercise.Services
{
  public class AppointmentService : IAppointmentService
  {
    private readonly IAppointmentCodec _appointmentCodec;
    private readonly IAppointmentRepository _appointmentsRepository;

    public AppointmentService(
    IAppointmentCodec appointmentCodec,
    IAppointmentRepository appointmentsRepository
    )
    {
      _appointmentCodec = appointmentCodec;
      _appointmentsRepository = appointmentsRepository;
    }

    public async Task<AppointmentViewModel> GetById(int id) => _appointmentCodec.Encode(await _appointmentsRepository.GetAsync(id));

    public async Task<IEnumerable<AppointmentViewModel>> GetByDate(int year, int month, int date)
    {
      var result = await _appointmentsRepository.GetByDate(year, month, date);

      if (result?.Count() == 0) return null;

      return _appointmentCodec.Encode(result);
    }

    public async Task<IEnumerable<MonthlyAppointmentSummaryViewModel>> GetMonthSummary(int year, int month)
    {
      var result = await _appointmentsRepository.GetMonthlySummary(year, month);

      return result?.Select(r => new MonthlyAppointmentSummaryViewModel() { Date = r.Key, Count = r.Value });
    }

    public async Task<AppointmentViewModel> Save(AppointmentViewModel appointment)
    {
      if (appointment.Id > 0)
      {
        var result = await _appointmentsRepository.UpdateAsync(_appointmentCodec.Decode(appointment));
        return result ? appointment : null;
      }
      else
      {
        var result = await _appointmentsRepository.InsertAsync(_appointmentCodec.Decode(appointment));
        appointment.Id = result;

        return appointment.Id > 0 ? appointment : null;
      }
    }

    public async Task<bool> DeleteAsync(long id)
    {
      var result = await _appointmentsRepository.DeleteAsync(id);

      return result == 1;
    }
  }
}
