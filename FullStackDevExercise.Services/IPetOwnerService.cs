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
  }
}
