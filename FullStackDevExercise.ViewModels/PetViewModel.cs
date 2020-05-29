namespace FullStackDevExercise.ViewModels
{
  public class PetViewModel:BaseViewModel
  {
    public long OwnerId { get; set; }
    public string Type { get; set; }
    public string Name { get; set; }
    public int Age { get; set; }
  }
}
