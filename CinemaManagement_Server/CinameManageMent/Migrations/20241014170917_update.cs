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
            migrationBuilder.DropForeignKey(
                name: "FK_Blogs_CategoryBlogs_IdCategoryBlogNavigationId",
                table: "Blogs");

            migrationBuilder.DropIndex(
                name: "IX_Blogs_IdCategoryBlogNavigationId",
                table: "Blogs");

            migrationBuilder.DropColumn(
                name: "IdCategoryBlogNavigationId",
                table: "Blogs");

            migrationBuilder.CreateIndex(
                name: "IX_Blogs_IdCategoryBlog",
                table: "Blogs",
                column: "IdCategoryBlog");

            migrationBuilder.AddForeignKey(
                name: "FK_Blogs_CategoryBlogs_IdCategoryBlog",
                table: "Blogs",
                column: "IdCategoryBlog",
                principalTable: "CategoryBlogs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Blogs_CategoryBlogs_IdCategoryBlog",
                table: "Blogs");

            migrationBuilder.DropIndex(
                name: "IX_Blogs_IdCategoryBlog",
                table: "Blogs");

            migrationBuilder.AddColumn<int>(
                name: "IdCategoryBlogNavigationId",
                table: "Blogs",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Blogs_IdCategoryBlogNavigationId",
                table: "Blogs",
                column: "IdCategoryBlogNavigationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Blogs_CategoryBlogs_IdCategoryBlogNavigationId",
                table: "Blogs",
                column: "IdCategoryBlogNavigationId",
                principalTable: "CategoryBlogs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
