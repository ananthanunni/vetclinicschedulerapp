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
  }
}
