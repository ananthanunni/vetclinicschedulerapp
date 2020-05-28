using Dapper;
using FullStackDevExercise.Data.Entity;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace FullStackDevExercise.Data.Repository
{
  public abstract class BaseRepository<TEntity> : IRepository<TEntity> where TEntity : class, IEntity
  {
    protected readonly string tableName;

    public BaseRepository(string tableName, IDbConnection connection)
    {
      Connection = connection;
      this.tableName = tableName;
    }

    public IDbConnection Connection { get; private set; }

    public virtual Task<IEnumerable<TEntity>> GetAsync() => Connection.QueryAsync<TEntity>($"SELECT * FROM [{tableName}]");
    public virtual Task<TEntity> GetAsync(long id) => Connection.QuerySingleOrDefaultAsync<TEntity>($"SELECT * FROM [{tableName}] WHERE [id]=?", new { @id = id });

    public abstract Task<int> InsertAsync(TEntity data);

    public abstract Task<bool> UpdateAsync(TEntity data);

    public virtual Task<int> DeleteAsync(long id)
    {
      return Connection.ExecuteAsync($"DELETE FROM [{tableName}] WHERE [id]=@id", new { @id = id });
    }
  }
}
