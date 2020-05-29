using FullStackDevExercise.Data.Entity;
using System;

namespace FullStackDevExercise.ViewModels.Codec
{
  public class AppointmentCodec : BaseCodec<AppointmentEntity, AppointmentViewModel>, IAppointmentCodec
  {
    public override AppointmentEntity Decode(AppointmentViewModel data) => new AppointmentEntity
    {
      id = data.Id,
      notes = data.Notes,
      pet_id = data.PetId,
      slot_from = data.SlotFrom.ToString(),
      slot_to = data.SlotTo.ToString()
    };

    public override AppointmentViewModel Encode(AppointmentEntity data) =>
    new AppointmentViewModel
    {
      Id = data.id,
      Notes = data.notes,
      PetId = data.pet_id,
      SlotFrom = DateTime.Parse(data.slot_from),
      SlotTo = DateTime.Parse(data.slot_to),
      OwnerId = data.owner_id,
      Pet = new PetViewModel
      {
        Id = data?.pet_id ?? 0,
        Age = data?.pet_age ?? 0,
        Name = data?.pet_name ?? "",
        OwnerId = data.owner_id ?? 0,
        Type = data?.pet_type ?? ""
      },
      Owner = new OwnerViewModel
      {
        Id = data?.owner_id ?? 0,
        FirstName = data?.owner_first_name,
        LastName = data?.owner_last_name
      }
    };
  }

  public interface IAppointmentCodec : ICodec<AppointmentEntity, AppointmentViewModel> { }
}
