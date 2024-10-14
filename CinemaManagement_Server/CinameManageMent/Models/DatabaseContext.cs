using Microsoft.EntityFrameworkCore;

namespace CinameManageMent.Models
{
    public class DatabaseContext:DbContext
    {
        public DatabaseContext()
        {
        }
        public DatabaseContext(DbContextOptions<DatabaseContext> options)
        : base(options)
        {
        }

        public virtual DbSet<Account> Accounts { get; set; }

        public virtual DbSet<Actor> Actors { get; set; }

        public virtual DbSet<Blog> Blogs { get; set; }

        public virtual DbSet<Category> Categories { get; set; }

        public virtual DbSet<CategoryBlog> CategoryBlogs { get; set; }

        public virtual DbSet<Cinema> Cinemas { get; set; }
        public virtual DbSet<Movie> Movies { get; set; }

        public virtual DbSet<DetailActorMovie> DetailActorMovies { get; set; }

        public virtual DbSet<DetailCategoryMovie> DetailCategoryMovies { get; set; }

    }
}
