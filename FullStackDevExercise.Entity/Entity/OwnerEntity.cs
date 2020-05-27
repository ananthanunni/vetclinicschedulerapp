namespace FullStackDevExercise.Data.Entity
{
  public class OwnerEntity : BaseEntity, IEntity
  {
    public string first_name { get; set; }
    public string last_name { get; set; }
  }
}
