using FullStackDevExercise.Data.Entity;
using System.Collections.Generic;
using System.Linq;

namespace FullStackDevExercise.ViewModels.Codec
{
  public abstract class BaseCodec<TEntity, TViewModel> : ICodec<TEntity, TViewModel> where TEntity : class, IEntity
  where TViewModel : BaseViewModel
  {
    public abstract TEntity Decode(TViewModel data);
    public abstract TViewModel Encode(TEntity data);

    public virtual IEnumerable<TEntity> Decode(IEnumerable<TViewModel> data) => data?.Select(r => Decode(r));
    public virtual IEnumerable<TViewModel> Encode(IEnumerable<TEntity> data) => data?.Select(r => Encode(r));
  }
}
