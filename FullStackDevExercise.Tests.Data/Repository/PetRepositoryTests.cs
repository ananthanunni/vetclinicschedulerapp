using Dapper;
using FullStackDevExercise.Data.Entity;
using FullStackDevExercise.Data.Repository;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace FullStackDevExercise.Tests.Data.Repository
{
  [TestClass]
  public class PetRepositoryTests : BaseRepositoryTest, IDisposable
  {
    private readonly OwnerEntity testOwner = new OwnerEntity
    {
      first_name = "OwnerFn",
      last_name = "OwnerLn"
    };

    private readonly PetEntity testPet1 = new PetEntity
    {
      owner_id = 1,
      name = "Pet1",
      age = 6,
      type = "dog"
    };

    private readonly PetEntity testPet2 = new PetEntity
    {
      owner_id = 1,
      name = "Pet2",
      age = 6,
      type = "cat"
    };

    public PetRepositoryTests() : base("pet")
    {
    }

    [TestMethod]
    public async Task GetByOwnerIdAsync_ExistingId_Existing()
    {
      // Arrange
      var repo = GetRepository();
      testOwner.id = await InsertOwner(repo.Connection, testOwner);
      testPet1.id = await InsertDummyPet(repo.Connection, testOwner.id, testPet1);
      testPet2.id = await InsertDummyPet(repo.Connection, testOwner.id, testPet2);

      // Act
      var result = await repo.GetByOwnerIdAsync(testOwner.id);

      // Assert
      Assert.AreEqual(2, result.Count());
      Assert.IsTrue(result.All(r => r.owner_id == testOwner.id));
    }

    [TestMethod]
    public async Task GetByOwnerIdAsync_NonExistingId_ShouldReturnNull()
    {
      // Arrange
      var repo = GetRepository();
      testOwner.id = await InsertOwner(repo.Connection, testOwner);
      testPet1.id = await InsertDummyPet(repo.Connection, testOwner.id, testPet1);
      testPet2.id = await InsertDummyPet(repo.Connection, testOwner.id, testPet2);

      // Act
      var result = await repo.GetByOwnerIdAsync(testOwner.id+1);

      // Assert
      Assert.Equals(0, result?.Count());
    }

    private PetRepository GetRepository()
    {
      InitializeDatabase();
      return new PetRepository(new System.Data.SQLite.SQLiteConnection($"Data Source = {DbFile};"));
    }

    private async Task<int> InsertDummyPet(
      IDbConnection connection,
      long ownerId,
      PetEntity pet)
    {
      var commandDefinition = new CommandDefinition(
      @$"INSERT INTO [pets]
      ([{nameof(PetEntity.owner_id)}],[{nameof(PetEntity.name)}],[{nameof(PetEntity.type)}],[{nameof(PetEntity.age)}])
      VALUES
      (@ownerId, @name, @type, @age);
      select last_insert_rowid();"
      , new { @ownerId = pet.owner_id, @name = pet.name, @type = pet.type, @age = pet.age });

      return await connection.ExecuteScalarAsync<int>(commandDefinition);
    }

    private async Task<int> InsertOwner(IDbConnection connection, OwnerEntity data)
    {
      return await connection.ExecuteScalarAsync<int>($@"
        INSERT INTO [owners]
          ({nameof(OwnerEntity.first_name)}, {nameof(OwnerEntity.last_name)})
        VALUES
          ('{data.first_name}', '{data.last_name}');
          select last_insert_rowid();
      ");
    }
  }
}
