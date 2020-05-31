using Dapper;
using FullStackDevExercise.Data.Entity;
using FullStackDevExercise.Data.Repository;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace FullStackDevExercise.Tests.Data.Repository
{
  [TestClass]
  public class OwnerRepositoryTests : BaseRepositoryTest
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

    [TestMethod]
    public async Task UpdateAsync_WithoutValidId_ShouldReturnFalse()
    {
      // Arrange
      var repo = GetRepository();
      var data = new OwnerEntity { id = 0, first_name = "first", last_name = "lastName" };

      // Act
      var result = await repo.UpdateAsync(data);

      // Assert
      Assert.IsFalse(result);
    }

    [TestMethod]
    public async Task UpdateAsync_NullEntity_ShouldReturnFalse()
    {
      // Arrange
      var repo = GetRepository();

      // Act
      var result = await repo.UpdateAsync(null);

      // Assert
      Assert.IsFalse(result);
    }

    [TestMethod]
    public async Task UpdateAsync_Valid_VerifyRecordUpdates()
    {
      // Arrange
      var repo = GetRepository();
      var data = new OwnerEntity { first_name = "firstName", last_name = "lastName" };
      var id = await ManualInsert(repo.Connection, data);
      data.id = id;

      // Act
      var updateSuccess = await repo.UpdateAsync(new OwnerEntity { id = id, first_name = "firstNameChange", last_name = "lastNameChange" });
      var updatedEntry = await repo.Connection.QuerySingleOrDefaultAsync<OwnerEntity>
      (
        "SELECT * from owners WHERE id=" + id.ToString()
      );

      // Assert
      Assert.IsTrue(updateSuccess);
      Assert.AreEqual(id, updatedEntry.id);
      Assert.AreEqual("firstNameChange", updatedEntry.first_name);
      Assert.AreEqual("lastNameChange", updatedEntry.last_name);
    }

    [TestMethod]
    public async Task UpdateAsync_NotExistingIdItem_ShouldBeFalse()
    {
      // Arrange
      var repo = GetRepository();

      // Act
      var updateSuccess = await repo.UpdateAsync(new OwnerEntity { id = 1, first_name = "firstNameChange", last_name = "lastNameChange" });
      var updatedEntry = await repo.Connection.QuerySingleOrDefaultAsync<OwnerEntity>
      (
        "SELECT * from owners WHERE id=" + 1.ToString()
      );

      // Assert
      Assert.IsFalse(updateSuccess);
      Assert.IsNull(updatedEntry);
    }

    private OwnerRepository GetRepository()
    {
      InitializeDatabase();
      return new OwnerRepository(new System.Data.SQLite.SQLiteConnection($"Data Source = {DbFile};"));
    }

    private async Task<int> ManualInsert(IDbConnection connection, OwnerEntity data) =>
      await connection.ExecuteScalarAsync<int>($@"
        INSERT INTO [owners]
          ({nameof(OwnerEntity.first_name)}, {nameof(OwnerEntity.last_name)})
        VALUES
          ('{data.first_name}', '{data.last_name}');
          select last_insert_rowid();
      ");
  }
}

