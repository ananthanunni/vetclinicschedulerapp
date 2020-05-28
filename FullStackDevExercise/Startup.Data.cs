using FullStackDevExercise.Data.Repository;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Data;

namespace FullStackDevExercise
{
  public partial class Startup
  {
    private void RegisterDataDependencies(IServiceCollection services)
    {
      // Register db connection
      services.AddTransient<IDbConnection>(r => new SqliteConnection(Configuration.GetConnectionString("SqliteDataSource")));

      // Register repositories
      services.AddScoped<IOwnerRepository, OwnerRepository>();
      services.AddScoped<IPetRepository, PetRepository>();
    }
  }
}
