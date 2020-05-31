using FullStackDevExercise.Data.Repository;
using FullStackDevExercise.ViewModels;
using FullStackDevExercise.ViewModels.Codec;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.VisualBasic;

namespace FullStackDevExercise.Services
{
  public class AppointmentService : IAppointmentService
  {
    private readonly IAppointmentCodec _appointmentCodec;
    private readonly IAppointmentRepository _appointmentsRepository;
    private readonly IOwnerRepository _ownerRepository;
    private readonly IOwnerCodec _ownerCodec;
    private readonly IPetRepository _petRepository;
    private readonly IPetCodec _petCodec;

    public AppointmentService(
    IAppointmentCodec appointmentCodec,
    IAppointmentRepository appointmentsRepository,
    IOwnerRepository ownerRepository,
    IOwnerCodec ownerCodec,
    IPetRepository petRepository,
    IPetCodec petCodec
    )
    {
      _appointmentCodec = appointmentCodec;
      _appointmentsRepository = appointmentsRepository;
      _ownerRepository = ownerRepository;
      _ownerCodec = ownerCodec;
      _petRepository = petRepository;
      _petCodec = petCodec;
    }

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
  }
}
