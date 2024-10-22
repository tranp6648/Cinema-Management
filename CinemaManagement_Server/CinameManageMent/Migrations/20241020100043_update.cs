using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CinameManageMent.Migrations
{
    /// <inheritdoc />
    public partial class update : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IdCategorySeat",
                table: "ShowTimeSeatPrice");

            migrationBuilder.DropColumn(
                name: "IdShowTime",
                table: "ShowTimeSeatPrice");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "IdCategorySeat",
                table: "ShowTimeSeatPrice",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "IdShowTime",
                table: "ShowTimeSeatPrice",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
