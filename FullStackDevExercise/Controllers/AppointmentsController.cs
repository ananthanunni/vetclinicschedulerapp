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

    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult<AppointmentViewModel>> Get(int id)
    {
      AppointmentViewModel result = await _appointmentsService.GetById(id);

      return result != null ? Ok(result) as ActionResult : NotFound();
    }


    [Route("{year}/{month}/{date}")]
    public async Task<ActionResult<IEnumerable<AppointmentViewModel>>> GetByDate(int year, int month, int date)
    {
      var result = await _appointmentsService.GetByDate(year, month+1, date);

      return Ok(result);
    }

    [Route("summary/{year}/{month}")]
    public async Task<ActionResult<IEnumerable<MonthlyAppointmentSummaryViewModel>>> GetSummaryForMonth(int year, int month)
    {
      return Ok(await _appointmentsService.GetMonthSummary(year, month));
    }

    [HttpPost]
    public async Task<ActionResult<AppointmentViewModel>> Post(AppointmentViewModel appointment)
    {
      var result = await _appointmentsService.Save(appointment);

      return result != null ? Created(Url.Action(nameof(Get), new { id = result.Id }), result) as ActionResult : BadRequest();
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<ActionResult> Delete(long id) => Ok(await _appointmentsService.DeleteAsync(id));
  }
}
