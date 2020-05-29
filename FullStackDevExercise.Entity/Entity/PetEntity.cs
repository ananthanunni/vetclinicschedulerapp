namespace FullStackDevExercise.Data.Entity
{
  public class PetEntity:BaseEntity, IEntity
  {
    public long owner_id { get; set; }
    public string type { get; set; }
    public string name { get; set; }
    public int age { get; set; }
  }
}
