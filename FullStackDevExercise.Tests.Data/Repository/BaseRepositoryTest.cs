using FullStackDevExercise.Data.Entity;
using FullStackDevExercise.Data.Repository;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace FullStackDevExercise.Tests.Data.Repository
{
  public abstract class BaseRepositoryTest
  {
    private readonly string _testModule;
    protected readonly string DbFile;

    public BaseRepositoryTest(string testModule)
    {
      _testModule = testModule;
      DbFile = Path.Combine(
        Directory.GetCurrentDirectory(), "DataSource",
        $"dolittle_module_{_testModule}_{DateTime.Now.ToFileTime()}.db"
      );
    }
    protected void InitializeDatabase()
    {
      // copy file
      var targetDir = Path.Combine(Directory.GetCurrentDirectory(), "DataSource");

      if (!Directory.Exists(targetDir))
        Directory.CreateDirectory(targetDir);

      File.Copy(
      Path.Combine(targetDir, "dolittle.db"),
      DbFile);
    }

    private async Task InsertDummyData<TRepository, TEntity>(TRepository repository, IEnumerable<TEntity> data)
    where TEntity : class, IEntity
    where TRepository : class, IRepository<TEntity>
    {
      foreach (var item in data)
        await repository.InsertAsync(item);
    }

    public void Dispose()
    {
      if (!string.IsNullOrWhiteSpace(DbFile))
        File.Delete(DbFile);
    }
  }
}

