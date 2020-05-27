using Dapper;
using FullStackDevExercise.Data.Entity;
using FullStackDevExercise.Data.Repository;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace FullStackDevExercise.Tests.Data.Repository
{
  [TestClass]
  public class OwnerRepositoryTests : BaseRepositoryTest, IDisposable
  {
    public OwnerRepositoryTests() : base("owner")
    {
    }

    [TestMethod]
    public async Task InsertAsync_ValidData_ShouldSucceed()
    {
      // Arrange
      var repo = GetRepository();

      // Act
      var result = await repo.InsertAsync(new OwnerEntity
      {
        first_name = "Test FN",
        last_name = "Test LN"
      });
      var read = await repo.Connection.QueryAsync<OwnerEntity>("SELECT * FROM [owners]");

      // Assert
      Assert.AreEqual(1, read.Count());
      Assert.AreEqual(1, result);
    }

    [TestMethod]
    public async Task InsertAsync_Null_ShouldReturnZero()
    {
      // Arrange
      var repo = GetRepository();

      // Act
      var result = await repo.InsertAsync(null);

      // Assert
      Assert.AreEqual(0, result);
    }

    private OwnerRepository GetRepository()
    {
      InitializeDatabase();
      return new OwnerRepository(new System.Data.SQLite.SQLiteConnection($"Data Source = {DbFile};"));
    }
  }
}

