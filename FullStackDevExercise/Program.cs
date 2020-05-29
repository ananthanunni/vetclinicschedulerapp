using FullStackDevExercise.Data.Entity;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using System.Linq;

namespace FullStackDevExercise
{
  public class Program
  {
    public static void Main(string[] args)
    {
      BootstrapData();
      CreateHostBuilder(args).Build().Run();
    }

    private static void BootstrapData()
    {
      var connectionStringBuilder = new SqliteConnectionStringBuilder();
      connectionStringBuilder.DataSource = "./dolittle.db";

      using var connection = new SqliteConnection(connectionStringBuilder.ConnectionString);
      connection.Open();
      SetupDB(connection);
      CreateOwnersTable(connection);
      CreatePetsTable(connection);
      CreateAppointmentsTable(connection);
    }

    private static void SetupDB(SqliteConnection connection)
    {
      var createTable = connection.CreateCommand();
      createTable.CommandText = @"  PRAGMA foreign_keys = ON;";
    }

    private static void CreateOwnersTable(SqliteConnection connection)
    {
      using var createTable = connection.CreateCommand();
      createTable.CommandText = @"
        CREATE TABLE IF NOT EXISTS owners
        (
          id INTEGER PRIMARY KEY
          , first_name VARCHAR(50) NOT NULL
          , last_name VARCHAR(50) NOT NULL
        )
      ";
      createTable.ExecuteNonQuery();
      createTable.Dispose();

      // Seed data
      var owners = new List<OwnerEntity>(new[] {
        new OwnerEntity{id =1, first_name = "Pug", last_name = "Owner 1"},
        new OwnerEntity{id =2, first_name = "Cat", last_name = "Owner 2"},
        new OwnerEntity{id =3, first_name = "Labrador", last_name = "Owner 3"},
      });
      using var seedDataCommand = connection.CreateCommand();
      foreach (var item in owners)
        ExecuteInsertSeedData(seedDataCommand,
        "owners",
          new List<string>(new[] { nameof(OwnerEntity.id), nameof(OwnerEntity.first_name), nameof(OwnerEntity.last_name) }),
          new List<object>(new object[] { item.id, item.first_name, item.last_name }
          ));
    }

    private static void CreateAppointmentsTable(SqliteConnection connection)
    {
      using var createTable = connection.CreateCommand();
      createTable.CommandText = @"
        CREATE TABLE  IF NOT EXISTS appointments (
	id	INTEGER PRIMARY KEY AUTOINCREMENT,
	pet_id	INTEGER,
	slot_from	VARCHAR(36),
	slot_to	VARCHAR(36),
	notes	TEXT,
	foreign key (pet_id) references pets(id) ON DELETE cascade ON UPDATE no action
)";
      createTable.ExecuteNonQuery();
      createTable.Dispose();
    }

    private static void CreatePetsTable(SqliteConnection connection)
    {
      using var createTable = connection.CreateCommand();
      createTable.CommandText = @"
        CREATE TABLE IF NOT EXISTS pets
        (
          id INTEGER PRIMARY KEY
          , owner_id INT NOT NULL
          , type VARCHAR(50) NOT NULL
          , name VARCHAR(50) NOT NULL
          , age INT NOT NULL
          , FOREIGN KEY (owner_id) REFERENCES owners(id) ON DELETE CASCADE ON UPDATE NO ACTION 
        )
      ";
      createTable.ExecuteNonQuery();

      // Seed data
      var pets = new List<PetEntity>(new[]{
        new PetEntity{id=1, type ="dog", owner_id = 1, name = "Pug pup", age=3},
        new PetEntity{id=2, type ="cat", owner_id = 1, name = "Meow", age=3},
        new PetEntity{id=3, type ="dog", owner_id = 1, name = "Lab", age=6},
        new PetEntity{id=4, type ="dog", owner_id = 1, name = "New Pup", age=3},
        new PetEntity{id=5, type ="cat", owner_id = 1, name = "Meow 2", age=5},
        new PetEntity{id=6, type ="dog", owner_id = 1, name = "New Lab", age=3},


        new PetEntity{id=7, type ="cat", owner_id = 2, name = "C Meow", age=3},
        new PetEntity{id=8, type ="dog", owner_id = 3, name = "New Lab", age=2},

        new PetEntity{id=9, type ="cat", owner_id = 1, name = "D Meow", age=3},
        new PetEntity{id=10, type ="dog", owner_id = 1, name = "Labbbb", age=6},
        new PetEntity{id=11, type ="dog", owner_id = 1, name = "New Puppy", age=3},
        new PetEntity{id=12, type ="cat", owner_id = 1, name = "Meowwww", age=5},
      });
      using var seedDataCommand = connection.CreateCommand();
      foreach (var item in pets)
        ExecuteInsertSeedData(seedDataCommand,
        "pets",
          new List<string>(new[] { nameof(PetEntity.id), nameof(PetEntity.owner_id), nameof(PetEntity.name), nameof(PetEntity.type), nameof(PetEntity.age) }),
          new List<object>(new object[] { item.id, item.owner_id, item.name, item.type, item.age }
          ));
    }

    private static void ExecuteInsertSeedData(SqliteCommand command, string table, IEnumerable<string> fields, IEnumerable<object> values)
    {
      command.Parameters.Clear();

      for (var i = 0; i < values.Count(); i++)
        command.Parameters.Add(new SqliteParameter($"@param_{i}", values.ElementAt(i)));

      command.CommandText = @$"
      INSERT OR REPLACE INTO {table} ({string.Join(',', fields)})
 SELECT {string.Join(',', values.Select((r, i) => $"@param_{i}"))}
 WHERE NOT EXISTS(SELECT * FROM {table}
                   WHERE {fields.First()} ={values.First()});
      ";
      command.ExecuteNonQuery();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
              webBuilder.UseStartup<Startup>();
            });
  }
}
