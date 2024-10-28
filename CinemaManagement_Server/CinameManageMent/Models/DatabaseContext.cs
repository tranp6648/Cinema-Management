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
        public virtual DbSet<ShowTime> ShowTime { get; set; }
        public virtual DbSet<District>Districts { get; set; }
        public virtual DbSet<ShowTimeSeatPrice> ShowTimeSeatPrices { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<DetailOrderCombo> DetailOrderCombos { get; set; }
        public virtual DbSet<DetailTicketOrder> TicketOrders { get; set; }
        public virtual DbSet<SeatMovieTime>SeatMovieTimes { get; set; }
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
            modelBuilder.Entity<District>().HasData(
         new District { id = 1, name = "Quận 1" },
         new District { id = 2, name = "Quận 2" },
         new District { id = 3, name = "Quận 3" },
         new District { id = 4, name = "Quận 4" },
         new District { id = 5, name = "Quận 5" },
         new District { id = 6, name = "Quận 6" },
         new District { id = 7, name = "Quận 7" },
         new District { id = 8, name = "Quận 8" },
         new District { id = 9, name = "Quận 9" },
         new District { id = 10, name = "Quận 10" },
         new District { id = 11, name = "Quận 11" },
         new District { id = 12, name = "Quận 12" },
         new District { id = 13, name = "Quận Bình Thạnh" },
         new District { id = 14, name = "Quận Phú Nhuận" },
         new District { id = 15, name = "Quận Tân Bình" },
         new District { id = 16, name = "Quận Tân Phú" },
         new District { id = 17, name = "Quận Gò Vấp" },
         new District { id = 18, name = "Quận Bình Tân" },
         new District { id = 19, name = "Huyện Nhà Bè" },
         new District { id = 20, name = "Huyện Củ Chi" },
         new District { id = 21, name = "Huyện Hóc Môn" },
         new District { id = 22, name = "Huyện Bình Chánh" },
         new District { id = 23, name = "Thành phố Thủ Đức" },
         new District { id = 24, name = "Huyện Cần Giờ" }
     );
        }


    }
}
