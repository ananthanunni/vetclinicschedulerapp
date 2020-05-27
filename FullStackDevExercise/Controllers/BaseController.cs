using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace FullStackDevExercise.Controllers
{
  /// <summary>
  /// Abstract class for all api controllers. Handy methods and properties for quick access.
  /// </summary>
  public abstract class BaseController : ControllerBase
  {
    private readonly IServiceProvider _serviceProvider;

    public BaseController(IServiceProvider serviceProvider)
    {
      _serviceProvider = serviceProvider;
    }

    public virtual TService GetService<TService>() => _serviceProvider.GetService<TService>();

    [Route("ping")]
    public virtual string Ping() => "pong";
  }
}
