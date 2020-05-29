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
    private readonly IPetCodec _petCodec;

    public PetOwnerService(IPetRepository petRepo, IOwnerRepository ownerRepo, IOwnerCodec ownerCodec, IPetCodec petCodec)
    {
      this._petRepo = petRepo;
      this._ownerRepo = ownerRepo;
      this._ownerCodec = ownerCodec;
      this._petCodec = petCodec;
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

    public async Task<IEnumerable<PetViewModel>> GetPetsByOwnerIdAsync(long ownerId) => _petCodec.ForOwnerId(ownerId).Encode(await _petRepo.GetByOwnerIdAsync(ownerId));

    public async Task<PetViewModel> GetPetByIdAsync(long ownerId, long id) => _petCodec.ForOwnerId(ownerId).Encode(await _petRepo.GetAsync(id));

    public async Task<bool> SavePetAsync(long ownerId, PetViewModel model)
    {
      if (model.Id == 0)
      {
        await _petRepo.InsertAsync(_petCodec.ForOwnerId(ownerId).Decode(model));
        return model.Id == 0;
      }
      else
      {
        var isSuccess = await _petRepo.UpdateAsync(_petCodec.ForOwnerId(ownerId).Decode(model));
        return isSuccess;
      }
    }

    public async Task<bool> DeletePetAsync(object ownerId, long id) => (await _petRepo.DeleteAsync(id)) == 1;
  }
}
