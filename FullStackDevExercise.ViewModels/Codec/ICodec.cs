using FullStackDevExercise.Data.Entity;
using System.Collections.Generic;

namespace FullStackDevExercise.ViewModels.Codec
{
  public interface ICodec<TEntity, TViewModel>
    where TEntity : class, IEntity
    where TViewModel : BaseViewModel
  {
    IEnumerable<TEntity> Decode(IEnumerable<TViewModel> data);
    TEntity Decode(TViewModel data);
    IEnumerable<TViewModel> Encode(IEnumerable<TEntity> data);
    TViewModel Encode(TEntity data);
  }
}