using CinameManageMent.Data;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CinameManageMent.Models
{
    public class DatabaseContext:DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) {
        
    }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
          
        }

        #region Dbset
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Detail_Category_Movie> Details { get; set; }
        public DbSet<Actor> Actors { get; set; }
        public DbSet<Detail_Actor_Movie> Details_Actors { get; set;}
        public DbSet<Cinema> Cinema { get; set; }

        #endregion
    }
}
