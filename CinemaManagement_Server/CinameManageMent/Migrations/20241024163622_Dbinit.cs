using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CinameManageMent.Migrations
{
    /// <inheritdoc />
    public partial class Dbinit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Accounts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Phone = table.Column<string>(type: "varchar(12)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Birthday = table.Column<DateOnly>(type: "date", nullable: false),
                    AccountType = table.Column<int>(type: "int", nullable: true),
                    Otp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedOtp = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Avatar = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accounts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Actors",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Nationality = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Birthday = table.Column<DateOnly>(type: "date", nullable: false),
                    Bio = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Actors", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CategoryBlogs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryBlogs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CategorySeat",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategorySeat", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Combos",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    price = table.Column<double>(type: "float", nullable: false),
                    banner = table.Column<string>(type: "varchar(200)", nullable: false),
                    Active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Combos", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "District",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(100)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_District", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Item",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(200)", nullable: false),
                    Category = table.Column<string>(type: "nvarchar(200)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Item", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Movies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ReleaseDate = table.Column<DateOnly>(type: "date", nullable: false),
                    Duration = table.Column<int>(type: "int", nullable: false),
                    Director = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Trailer = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Picture = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Movies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Order",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TotalPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    IdAccount = table.Column<int>(type: "int", nullable: false),
                    OrderDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    status = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Order", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Order_Accounts_IdAccount",
                        column: x => x.IdAccount,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Blogs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IdCategoryBlog = table.Column<int>(type: "int", nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<bool>(type: "bit", nullable: false),
                    ContentBlog = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Blogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Blogs_CategoryBlogs_IdCategoryBlog",
                        column: x => x.IdCategoryBlog,
                        principalTable: "CategoryBlogs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Cinema",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DitrictId = table.Column<int>(type: "int", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IdManager = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cinema", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Cinema_District_DitrictId",
                        column: x => x.DitrictId,
                        principalTable: "District",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ComboItems",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idCombo = table.Column<int>(type: "int", nullable: false),
                    idItem = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ComboItems", x => x.id);
                    table.ForeignKey(
                        name: "FK_ComboItems_Combos_idCombo",
                        column: x => x.idCombo,
                        principalTable: "Combos",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ComboItems_Item_idItem",
                        column: x => x.idItem,
                        principalTable: "Item",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DetailActorMovies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdActor = table.Column<int>(type: "int", nullable: false),
                    IdMovie = table.Column<int>(type: "int", nullable: false),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetailActorMovies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DetailActorMovies_Actors_IdActor",
                        column: x => x.IdActor,
                        principalTable: "Actors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DetailActorMovies_Movies_IdMovie",
                        column: x => x.IdMovie,
                        principalTable: "Movies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DetailCategoryMovies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdCategory = table.Column<int>(type: "int", nullable: false),
                    IdMovie = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetailCategoryMovies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DetailCategoryMovies_Categories_IdCategory",
                        column: x => x.IdCategory,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DetailCategoryMovies_Movies_IdMovie",
                        column: x => x.IdMovie,
                        principalTable: "Movies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Feedback",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Comment = table.Column<string>(type: "ntext", nullable: false),
                    Feedback_Date = table.Column<DateTime>(type: "datetime", nullable: false),
                    RatingComment = table.Column<int>(type: "int", nullable: false),
                    IdMovie = table.Column<int>(type: "int", nullable: false),
                    IdAccount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Feedback", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Feedback_Accounts_IdAccount",
                        column: x => x.IdAccount,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Feedback_Movies_IdMovie",
                        column: x => x.IdMovie,
                        principalTable: "Movies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Screen",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    CinemaId = table.Column<int>(type: "int", nullable: false),
                    Capacity = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Screen", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Screen_Cinema_CinemaId",
                        column: x => x.CinemaId,
                        principalTable: "Cinema",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DetailSeats",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idScreen = table.Column<int>(type: "int", nullable: false),
                    idCategorySeat = table.Column<int>(type: "int", nullable: false),
                    name = table.Column<string>(type: "nvarchar(200)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetailSeats", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DetailSeats_CategorySeat_idCategorySeat",
                        column: x => x.idCategorySeat,
                        principalTable: "CategorySeat",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DetailSeats_Screen_idScreen",
                        column: x => x.idScreen,
                        principalTable: "Screen",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ShowTime",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idMovie = table.Column<int>(type: "int", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IdScreen = table.Column<int>(type: "int", nullable: false),
                    IdAccountCreate = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShowTime", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ShowTime_Movies_idMovie",
                        column: x => x.idMovie,
                        principalTable: "Movies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ShowTime_Screen_IdScreen",
                        column: x => x.IdScreen,
                        principalTable: "Screen",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DetailOrderCombos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderId = table.Column<int>(type: "int", nullable: false),
                    IdCombo = table.Column<int>(type: "int", nullable: false),
                    comboid = table.Column<int>(type: "int", nullable: false),
                    ShowTimeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetailOrderCombos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DetailOrderCombos_Combos_comboid",
                        column: x => x.comboid,
                        principalTable: "Combos",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DetailOrderCombos_Order_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Order",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DetailOrderCombos_ShowTime_ShowTimeId",
                        column: x => x.ShowTimeId,
                        principalTable: "ShowTime",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ShowTimeSeatPrice",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    showTimeId = table.Column<int>(type: "int", nullable: false),
                    categorySeatId = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShowTimeSeatPrice", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ShowTimeSeatPrice_CategorySeat_categorySeatId",
                        column: x => x.categorySeatId,
                        principalTable: "CategorySeat",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ShowTimeSeatPrice_ShowTime_showTimeId",
                        column: x => x.showTimeId,
                        principalTable: "ShowTime",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "CategorySeat",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "VIP" },
                    { 2, "Normal" }
                });

            migrationBuilder.InsertData(
                table: "District",
                columns: new[] { "id", "name" },
                values: new object[,]
                {
                    { 1, "Quận 1" },
                    { 2, "Quận 2" },
                    { 3, "Quận 3" },
                    { 4, "Quận 4" },
                    { 5, "Quận 5" },
                    { 6, "Quận 6" },
                    { 7, "Quận 7" },
                    { 8, "Quận 8" },
                    { 9, "Quận 9" },
                    { 10, "Quận 10" },
                    { 11, "Quận 11" },
                    { 12, "Quận 12" },
                    { 13, "Quận Bình Thạnh" },
                    { 14, "Quận Phú Nhuận" },
                    { 15, "Quận Tân Bình" },
                    { 16, "Quận Tân Phú" },
                    { 17, "Quận Gò Vấp" },
                    { 18, "Quận Bình Tân" },
                    { 19, "Huyện Nhà Bè" },
                    { 20, "Huyện Củ Chi" },
                    { 21, "Huyện Hóc Môn" },
                    { 22, "Huyện Bình Chánh" },
                    { 23, "Thành phố Thủ Đức" },
                    { 24, "Huyện Cần Giờ" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Blogs_IdCategoryBlog",
                table: "Blogs",
                column: "IdCategoryBlog");

            migrationBuilder.CreateIndex(
                name: "IX_Cinema_DitrictId",
                table: "Cinema",
                column: "DitrictId");

            migrationBuilder.CreateIndex(
                name: "IX_ComboItems_idCombo",
                table: "ComboItems",
                column: "idCombo");

            migrationBuilder.CreateIndex(
                name: "IX_ComboItems_idItem",
                table: "ComboItems",
                column: "idItem");

            migrationBuilder.CreateIndex(
                name: "IX_DetailActorMovies_IdActor",
                table: "DetailActorMovies",
                column: "IdActor");

            migrationBuilder.CreateIndex(
                name: "IX_DetailActorMovies_IdMovie",
                table: "DetailActorMovies",
                column: "IdMovie");

            migrationBuilder.CreateIndex(
                name: "IX_DetailCategoryMovies_IdCategory",
                table: "DetailCategoryMovies",
                column: "IdCategory");

            migrationBuilder.CreateIndex(
                name: "IX_DetailCategoryMovies_IdMovie",
                table: "DetailCategoryMovies",
                column: "IdMovie");

            migrationBuilder.CreateIndex(
                name: "IX_DetailOrderCombos_comboid",
                table: "DetailOrderCombos",
                column: "comboid");

            migrationBuilder.CreateIndex(
                name: "IX_DetailOrderCombos_OrderId",
                table: "DetailOrderCombos",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_DetailOrderCombos_ShowTimeId",
                table: "DetailOrderCombos",
                column: "ShowTimeId");

            migrationBuilder.CreateIndex(
                name: "IX_DetailSeats_idCategorySeat",
                table: "DetailSeats",
                column: "idCategorySeat");

            migrationBuilder.CreateIndex(
                name: "IX_DetailSeats_idScreen",
                table: "DetailSeats",
                column: "idScreen");

            migrationBuilder.CreateIndex(
                name: "IX_Feedback_IdAccount",
                table: "Feedback",
                column: "IdAccount");

            migrationBuilder.CreateIndex(
                name: "IX_Feedback_IdMovie",
                table: "Feedback",
                column: "IdMovie");

            migrationBuilder.CreateIndex(
                name: "IX_Order_IdAccount",
                table: "Order",
                column: "IdAccount");

            migrationBuilder.CreateIndex(
                name: "IX_Screen_CinemaId",
                table: "Screen",
                column: "CinemaId");

            migrationBuilder.CreateIndex(
                name: "IX_ShowTime_idMovie",
                table: "ShowTime",
                column: "idMovie");

            migrationBuilder.CreateIndex(
                name: "IX_ShowTime_IdScreen",
                table: "ShowTime",
                column: "IdScreen");

            migrationBuilder.CreateIndex(
                name: "IX_ShowTimeSeatPrice_categorySeatId",
                table: "ShowTimeSeatPrice",
                column: "categorySeatId");

            migrationBuilder.CreateIndex(
                name: "IX_ShowTimeSeatPrice_showTimeId",
                table: "ShowTimeSeatPrice",
                column: "showTimeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Blogs");

            migrationBuilder.DropTable(
                name: "ComboItems");

            migrationBuilder.DropTable(
                name: "DetailActorMovies");

            migrationBuilder.DropTable(
                name: "DetailCategoryMovies");

            migrationBuilder.DropTable(
                name: "DetailOrderCombos");

            migrationBuilder.DropTable(
                name: "DetailSeats");

            migrationBuilder.DropTable(
                name: "Feedback");

            migrationBuilder.DropTable(
                name: "ShowTimeSeatPrice");

            migrationBuilder.DropTable(
                name: "CategoryBlogs");

            migrationBuilder.DropTable(
                name: "Item");

            migrationBuilder.DropTable(
                name: "Actors");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Combos");

            migrationBuilder.DropTable(
                name: "Order");

            migrationBuilder.DropTable(
                name: "CategorySeat");

            migrationBuilder.DropTable(
                name: "ShowTime");

            migrationBuilder.DropTable(
                name: "Accounts");

            migrationBuilder.DropTable(
                name: "Movies");

            migrationBuilder.DropTable(
                name: "Screen");

            migrationBuilder.DropTable(
                name: "Cinema");

            migrationBuilder.DropTable(
                name: "District");
        }
    }
}
