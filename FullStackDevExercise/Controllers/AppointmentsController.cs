using FullStackDevExercise.Services;
using FullStackDevExercise.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FullStackDevExercise.Controllers
{
  [ApiController]
  [Route("api/appointments")]
  public class AppointmentsController : BaseController
  {
    private readonly IAppointmentService _appointmentsService;

    public AppointmentsController(IServiceProvider serviceProvider) : base(serviceProvider)
    {
      _appointmentsService = GetService<IAppointmentService>();
    }

    [Route("{year}/{month}/{date}")]
    public async Task<ActionResult<IEnumerable<AppointmentViewModel>>> GetByDate(int year, int month, int date)
    {
      var result = await _appointmentsService.GetByDate(year, month, date);

      return Ok(result);
    }

    [Route("summary/{year}/{month}")]
    public async Task<ActionResult<IEnumerable<MonthlyAppointmentSummaryViewModel>>> GetSummaryForMonth(int year, int month)
    {
      return Ok(await _appointmentsService.GetMonthSummary(year, month));
    }
  }
}
