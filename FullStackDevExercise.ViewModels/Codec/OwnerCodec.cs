using FullStackDevExercise.Data.Entity;

namespace FullStackDevExercise.ViewModels.Codec
{
  public class OwnerCodec : BaseCodec<OwnerEntity, OwnerViewModel>, IOwnerCodec
  {
    public override OwnerEntity Decode(OwnerViewModel data) => data == null ? null : new OwnerEntity { first_name = data.FirstName, last_name = data.LastName, id = data.Id };
    public override OwnerViewModel Encode(OwnerEntity data) => data == null ? null : new OwnerViewModel { FirstName = data.first_name, LastName = data.last_name, Id = data.id };
  }

  public interface IOwnerCodec : ICodec<OwnerEntity, OwnerViewModel> { }
}
