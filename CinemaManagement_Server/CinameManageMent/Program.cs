using CinameManageMent.Data;
using CinameManageMent.Models;
using CinameManageMent.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;

namespace CinameManageMent
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container
            ConfigureServices(builder);

            var app = builder.Build();

            // Configure the HTTP request pipeline
            ConfigureMiddleware(app);

            app.Run();
        }

        private static void ConfigureServices(WebApplicationBuilder builder)
        {
            // Add essential services
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Configure the database context
            var connectionString = builder.Configuration["ConnectionStrings:DefaultConnect"];
            builder.Services.AddDbContext<DatabaseContext>(options =>
                options.UseLazyLoadingProxies().UseSqlServer(connectionString));

            // Register services
            builder.Services.AddScoped<AccountService, AccountServiceImpl>();
            builder.Services.AddScoped<CategoryService, CategoryServiceImpl>();
            builder.Services.AddScoped<ActorService, ActorServiceImpl>();
            builder.Services.AddScoped<MovieService, MovieServiceImpl>();
            builder.Services.AddScoped<CinemaService, CinemaServiceImpl>();
            builder.Services.AddScoped<CategoryBlogService, CategoryBlogServiceImpl>();
            builder.Services.AddScoped<BlogService, BlogServiceImpl>();
            builder.Services.AddScoped<FeedBackService,FeedbackServiceImpl>();
            builder.Services.AddScoped<ScreenService, ScreenServiceImpl>();
            builder.Services.AddScoped<ItemService, ItemServiceImpl>();
            builder.Services.AddScoped<ComboItemService, ComboItemServiceImpl>();

            // Configure JWT authentication (if needed in the future)
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Secret"])),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });
            builder.Services.AddAuthorization(options =>
            {
                options.AddPolicy("User", policy =>
                {
                    policy.RequireAssertion(context =>
                        context.User.HasClaim(c => c.Type == ClaimTypes.Role && ( c.Value == "User"))
                        ); // Add any additional claim checks here
                });
                options.AddPolicy("Admin", policy =>
                {
                    policy.RequireAssertion(context =>
                        context.User.HasClaim(c => c.Type == ClaimTypes.Role && (c.Value == "Admin"))
                        ); // Add any additional claim checks here
                });
                options.AddPolicy("SuperAdmin", policy =>
                {
                    policy.RequireAssertion(context =>

                    context.User.HasClaim(c => c.Type == ClaimTypes.Role && (c.Value == "SuperAdmin"))
                    );
                });
                options.AddPolicy("AdminOrSuperAdmin", policy =>
                {
                    policy.RequireAssertion(context =>
                        context.User.HasClaim(c => c.Type == ClaimTypes.Role &&
                            (c.Value == "Admin" || c.Value == "SuperAdmin")));
                });
            });
            builder.WebHost.ConfigureKestrel(serverOptions =>
            {
                serverOptions.Limits.MaxRequestBodySize = 50 * 1024 * 1024; // 50 MB
            });

            // Configure CORS policy
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("ReactPolicy", builder =>
                {
                    builder.WithOrigins("http://localhost:3000") // Specify the exact origin
                           .AllowAnyHeader()
                           .AllowAnyMethod()
                           .AllowCredentials();
                });
            });
        }

        private static void ConfigureMiddleware(WebApplication app)
        {
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
        

            app.UseCors("ReactPolicy");
            app.UseStaticFiles();
            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();
        }
    }
}
