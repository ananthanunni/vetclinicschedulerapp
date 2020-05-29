using System;

namespace FullStackDevExercise.ViewModels
{
  public class AppointmentViewModel:BaseViewModel
  {
    public long? OwnerId{ get; set; }
    public long PetId { get; set; }

    public DateTime SlotFrom{ get; set; }
    public DateTime SlotTo{ get; set; }

    public string Notes { get; set; }

    public PetViewModel Pet { get; set; }
    public OwnerViewModel Owner{ get; set; }
  }
}
