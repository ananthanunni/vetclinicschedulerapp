using FullStackDevExercise.Services;
using FullStackDevExercise.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace FullStackDevExercise.Controllers
{
  [ApiController]
  [Route("api/pets/{ownerId}")]
  public class PetsController : BaseController
  {
    private readonly IPetOwnerService _petOwnerService;

    public PetsController(IServiceProvider serviceProvider) : base(serviceProvider)
    {
      _petOwnerService = GetService<IPetOwnerService>();
    }

    [HttpGet]
    public async Task<ActionResult> Get(long ownerId)
    {
      var result = await _petOwnerService.GetPetsByOwnerIdAsync(ownerId);
      return Ok(result);
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult<PetViewModel>> Get(long ownerId, long id)
    {
      var result = await _petOwnerService.GetPetByIdAsync(ownerId, id);

      if (result == null) return NotFound();

      return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<OwnerViewModel>> Post(long ownerId, PetViewModel model)
    {
      model.Id = 0;
      var isInsert = model.Id == 0;
      var isSuccess = await _petOwnerService.SavePetAsync(ownerId, model);

      return isSuccess ?
      (isInsert ? Created(Url.Action(nameof(Get), new { ownerId=ownerId, id=model.Id  }), model) as ActionResult : BadRequest() as ActionResult)
      : BadRequest();
    }

    [HttpPut]
    [Route("{id}")]
    public async Task<ActionResult<PetViewModel>> Put(long ownerId, long id, PetViewModel model)
    {
      model.Id = id;
      var isSaved = await _petOwnerService.SavePetAsync(ownerId, model);

      if (!isSaved) return NotFound();

      return Ok(isSaved);
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<ActionResult> Delete(long ownerId, long id)
    {
      var deleteOk = await _petOwnerService.DeletePetAsync(ownerId, id);

      return deleteOk ? Ok() : StatusCode((int)HttpStatusCode.InternalServerError);
    }
  }
}
