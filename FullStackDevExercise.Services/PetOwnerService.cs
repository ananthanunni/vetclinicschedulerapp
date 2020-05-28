using FullStackDevExercise.Data.Repository;
using FullStackDevExercise.ViewModels;
using FullStackDevExercise.ViewModels.Codec;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FullStackDevExercise.Services
{
  public class PetOwnerService : IPetOwnerService
  {
    private readonly IPetRepository _petRepo;
    private readonly IOwnerRepository _ownerRepo;
    private readonly IOwnerCodec _ownerCodec;

    public PetOwnerService(IPetRepository petRepo, IOwnerRepository ownerRepo, IOwnerCodec ownerCodec)
    {
      this._petRepo = petRepo;
      this._ownerRepo = ownerRepo;
      this._ownerCodec = ownerCodec;
    }

    public async Task<IEnumerable<OwnerViewModel>> GetOwnersAsync()
    {
      var owners = await _ownerRepo.GetAsync();

      return owners?.Select(r => _ownerCodec.Encode(r));
    }

    public async Task<OwnerViewModel> GetOwnerAsync(long id) => _ownerCodec.Encode(await _ownerRepo.GetAsync(id));

    public async Task<bool> SaveOwnerAsync(OwnerViewModel model)
    {
      if (model.Id == 0)
      {
        await _ownerRepo.InsertAsync(_ownerCodec.Decode(model));
        return model.Id == 0;
      }
      else
      {
        var isSuccess = await _ownerRepo.UpdateAsync(_ownerCodec.Decode(model));
        return isSuccess;
      }
    }

    public async Task<bool> DeleteOwnerAsync(long id) => (await _ownerRepo.DeleteAsync(id)) == 1;
  }
}
