using FullStackDevExercise.Data.Entity;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace FullStackDevExercise.Data.Repository
{
  public interface IRepository<TEntity> where TEntity : class, IEntity
  {
    IDbConnection Connection { get; }
    int DeleteAsync(long id);
    Task<TEntity> GetAsync(long id);
    Task<IEnumerable<TEntity>> GetAsync();
    Task<int> InsertAsync(TEntity data);
    Task<bool> UpdateAsync(TEntity data);
  }
}
