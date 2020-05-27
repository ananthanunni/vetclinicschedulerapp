using FullStackDevExercise.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FullStackDevExercise.Services
{
  public interface IPetOwnerService
  {
    Task<IEnumerable<OwnerViewModel>> GetOwnersAsync();
  }
}
