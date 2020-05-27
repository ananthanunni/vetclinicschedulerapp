using FullStackDevExercise.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace FullStackDevExercise.Controllers
{
  [ApiController]
  [Route("api/pets")]
  public class OwnersController : BaseController
  {
    private readonly IPetOwnerService _petOwnerService;

    public OwnersController(IServiceProvider serviceProvider) : base(serviceProvider)
    {
      _petOwnerService = GetService<IPetOwnerService>();
    }

    [HttpGet]
    public async Task<ActionResult> Get()
    {
      var result = await _petOwnerService.GetOwnersAsync();
      return Ok(result);
    }
  }
}
