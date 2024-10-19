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
        public virtual DbSet<Feedback> Feedbacks { get; set; }
        public virtual DbSet<CategorySeat> CategorySeats { get; set; }  
        public virtual DbSet<Screen> Screen { get; set; }
        public virtual DbSet<Item> Item { get; set; }
        public virtual DbSet<Combo> Combos { get; set; }
        public virtual DbSet<ComboItem>ComboItems { get; set; } 
        public virtual DbSet<DetailSeatMovieScreen> DetailSeats { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            Seed(modelBuilder);
        }

        private void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CategorySeat>().HasData(
                new CategorySeat { Id = 1, Name = "VIP" },
                new CategorySeat { Id = 2, Name = "Normal" }
            );
        }


    }
}
