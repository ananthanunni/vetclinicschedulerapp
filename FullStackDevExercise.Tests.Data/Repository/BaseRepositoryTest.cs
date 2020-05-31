using System;
using System.IO;

namespace FullStackDevExercise.Tests.Data.Repository
{
  public abstract class BaseRepositoryTest : IDisposable
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

    public virtual void Dispose()
    {
      if (!string.IsNullOrWhiteSpace(DbFile))
        File.Delete(DbFile);
    }
  }
}

