using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CinameManageMent.Migrations
{
    /// <inheritdoc />
    public partial class DBinit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Account",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    username = table.Column<string>(type: "varchar(200)", nullable: false),
                    Email = table.Column<string>(type: "varchar(10)", nullable: false),
                    Phone = table.Column<string>(type: "varchar(12)", nullable: false),
                    password = table.Column<string>(type: "varchar(200)", nullable: false),
                    FullName = table.Column<string>(type: "Varchar(200)", nullable: false),
                    Birthday = table.Column<DateOnly>(type: "date", nullable: false),
                    AccountType = table.Column<int>(type: "int", nullable: true),
                    Otp = table.Column<string>(type: "varchar(4)", nullable: true),
                    CreatedOtp = table.Column<DateTime>(type: "datetime", nullable: true),
                    Avatar = table.Column<string>(type: "Varchar(200)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Account", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Actor",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "Varchar(200)", nullable: false),
                    Nationality = table.Column<string>(type: "Varchar(100)", nullable: false),
                    Image = table.Column<string>(type: "Varchar(200)", nullable: false),
                    Bio = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Actor", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Category",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "Varchar(200)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Category", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Movie",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "Varchar(200)", nullable: false),
                    Description = table.Column<string>(type: "ntext", nullable: false),
                    ReleaseDate = table.Column<DateOnly>(type: "Date", nullable: false),
                    Duration = table.Column<int>(type: "int", nullable: false),
                    Director = table.Column<string>(type: "Nvarchar(200)", nullable: false),
                    Trailer = table.Column<string>(type: "varchar(200)", nullable: false),
                    Picture = table.Column<string>(type: "varchar(200)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Movie", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Detail_Actor_Movie",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idActor = table.Column<int>(type: "int", nullable: false),
                    idMovie = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Detail_Actor_Movie", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Detail_Actor_Movie_Actor_idActor",
                        column: x => x.idActor,
                        principalTable: "Actor",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Detail_Actor_Movie_Movie_idMovie",
                        column: x => x.idMovie,
                        principalTable: "Movie",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DetailCategoryMovie",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdCategory = table.Column<int>(type: "int", nullable: false),
                    IdMovie = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetailCategoryMovie", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DetailCategoryMovie_Category_IdCategory",
                        column: x => x.IdCategory,
                        principalTable: "Category",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DetailCategoryMovie_Movie_IdMovie",
                        column: x => x.IdMovie,
                        principalTable: "Movie",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Detail_Actor_Movie_idActor",
                table: "Detail_Actor_Movie",
                column: "idActor");

            migrationBuilder.CreateIndex(
                name: "IX_Detail_Actor_Movie_idMovie",
                table: "Detail_Actor_Movie",
                column: "idMovie");

            migrationBuilder.CreateIndex(
                name: "IX_DetailCategoryMovie_IdCategory",
                table: "DetailCategoryMovie",
                column: "IdCategory");

            migrationBuilder.CreateIndex(
                name: "IX_DetailCategoryMovie_IdMovie",
                table: "DetailCategoryMovie",
                column: "IdMovie");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Account");

            migrationBuilder.DropTable(
                name: "Detail_Actor_Movie");

            migrationBuilder.DropTable(
                name: "DetailCategoryMovie");

            migrationBuilder.DropTable(
                name: "Actor");

            migrationBuilder.DropTable(
                name: "Category");

            migrationBuilder.DropTable(
                name: "Movie");
        }
    }
}
