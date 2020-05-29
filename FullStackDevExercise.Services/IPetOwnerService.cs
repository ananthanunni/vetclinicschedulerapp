using FullStackDevExercise.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FullStackDevExercise.Services
{
  public interface IPetOwnerService
  {
    Task<IEnumerable<OwnerViewModel>> GetOwnersAsync();
    Task<OwnerViewModel> GetOwnerAsync(long id);
    Task<bool> SaveOwnerAsync(OwnerViewModel model);
    Task<bool> DeleteOwnerAsync(long id);
    Task<IEnumerable<PetViewModel>> GetPetsByOwnerIdAsync(long ownerId);
    Task<PetViewModel> GetPetByIdAsync(long ownerId, long id);
    Task<bool> SavePetAsync(long ownerId, PetViewModel model);
    Task<bool> DeletePetAsync(object ownerId, long id);
  }
}
