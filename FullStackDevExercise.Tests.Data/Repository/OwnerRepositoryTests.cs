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

    [TestMethod]
    public async Task InsertAsync_Multiple_AreIdsBeingReturned()
    {
      // Arrange
      var repo = GetRepository();

      // Act
      var insert1 = await repo.InsertAsync(new OwnerEntity { first_name = "fn1", last_name = "ln1" });
      var insert2 = await repo.InsertAsync(new OwnerEntity { first_name = "fn2", last_name = "ln2" });
      var insert3 = await repo.InsertAsync(new OwnerEntity { first_name = "fn3", last_name = "ln3" });


      // Assert
      var read = await repo.Connection.QueryAsync<OwnerEntity>("SELECT * FROM [owners]");
      Assert.AreEqual(3, read.Count());

      Assert.AreEqual(1, insert1);
      Assert.AreEqual(1, read.ElementAt(0).id);
      Assert.AreEqual("fn1", read.ElementAt(0).first_name);

      Assert.AreEqual(2, insert2);
      Assert.AreEqual(2, read.ElementAt(1).id);
      Assert.AreEqual("fn2", read.ElementAt(1).first_name);

      Assert.AreEqual(3, insert3);
      Assert.AreEqual(3, read.ElementAt(2).id);
      Assert.AreEqual("fn3", read.ElementAt(2).first_name);
    }

    private OwnerRepository GetRepository()
    {
      InitializeDatabase();
      return new OwnerRepository(new System.Data.SQLite.SQLiteConnection($"Data Source = {DbFile};"));
    }
  }
}

