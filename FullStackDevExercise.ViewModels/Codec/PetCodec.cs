using FullStackDevExercise.Data.Entity;

namespace FullStackDevExercise.ViewModels.Codec
{
  public class PetCodec : BaseCodec<PetEntity, PetViewModel>, IPetCodec
  {
    private long _ownerId = 0;

    public override PetEntity Decode(PetViewModel data) => new PetEntity
    {
      id = data.Id,
      age = data.Age,
      name = data.Name,
      owner_id = _ownerId,
      type = data.Type
    };

    public override PetViewModel Encode(PetEntity data) => new PetViewModel
    {
      Id = data.id,
      OwnerId = _ownerId,
      Age = data.age,
      Name = data.name,
      Type = data.type
    };

    public IPetCodec ForOwnerId(long id)
    {
      _ownerId = id;
      return this;
    }
  }

  public interface IPetCodec : ICodec<PetEntity, PetViewModel>
  {
    IPetCodec ForOwnerId(long id);
  }
}
