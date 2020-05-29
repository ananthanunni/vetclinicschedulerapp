namespace FullStackDevExercise.Data.Entity
{
  public class AppointmentEntity:BaseEntity, IEntity
  {
    public long pet_id { get; set; }
    public string slot_from { get; set; }
    public string slot_to { get; set; }
    public string notes { get; set; }
  }
}
