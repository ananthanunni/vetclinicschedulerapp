using FullStackDevExercise.Services;
using FullStackDevExercise.ViewModels.Codec;
using Microsoft.Extensions.DependencyInjection;

namespace FullStackDevExercise
{
  public partial class Startup
  {
    private void RegisterServiceDependencies(IServiceCollection services)
    {
      // Register services
      services.AddScoped<IPetOwnerService, PetOwnerService>();

      // Register codecs
      services.AddScoped<IOwnerCodec, OwnerCodec>();
      services.AddScoped<IPetCodec, PetCodec>();
    }
  }
}
