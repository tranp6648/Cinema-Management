using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CinameManageMent.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Account");
        }
    }
}
