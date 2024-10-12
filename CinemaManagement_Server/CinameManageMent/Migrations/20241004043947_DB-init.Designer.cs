﻿// <auto-generated />
using System;
using CinameManageMent.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace CinameManageMent.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20241004043947_DB-init")]
    partial class DBinit
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Proxies:ChangeTracking", false)
                .HasAnnotation("Proxies:CheckEquality", false)
                .HasAnnotation("Proxies:LazyLoading", true)
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("CinameManageMent.Models.Account", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("AccountType")
                        .HasColumnType("int");

                    b.Property<string>("Avatar")
                        .HasColumnType("Varchar(200)");

                    b.Property<DateOnly>("Birthday")
                        .HasColumnType("date");

                    b.Property<DateTime?>("CreatedOtp")
                        .HasColumnType("datetime");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("varchar(10)");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("Varchar(200)");

                    b.Property<string>("Otp")
                        .HasColumnType("varchar(4)");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("varchar(12)");

                    b.Property<string>("password")
                        .IsRequired()
                        .HasColumnType("varchar(200)");

                    b.Property<string>("username")
                        .IsRequired()
                        .HasColumnType("varchar(200)");

                    b.HasKey("Id");

                    b.ToTable("Account");
                });

            modelBuilder.Entity("CinameManageMent.Models.Actor", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<string>("Bio")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Image")
                        .IsRequired()
                        .HasColumnType("Varchar(200)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("Varchar(200)");

                    b.Property<string>("Nationality")
                        .IsRequired()
                        .HasColumnType("Varchar(100)");

                    b.HasKey("id");

                    b.ToTable("Actor");
                });

            modelBuilder.Entity("CinameManageMent.Models.Category", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("Varchar(200)");

                    b.HasKey("id");

                    b.ToTable("Category");
                });

            modelBuilder.Entity("CinameManageMent.Models.Detail_Actor_Movie", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("idActor")
                        .HasColumnType("int");

                    b.Property<int>("idMovie")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("idActor");

                    b.HasIndex("idMovie");

                    b.ToTable("Detail_Actor_Movie");
                });

            modelBuilder.Entity("CinameManageMent.Models.Detail_Category_Movie", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("IdCategory")
                        .HasColumnType("int");

                    b.Property<int>("IdMovie")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("IdCategory");

                    b.HasIndex("IdMovie");

                    b.ToTable("DetailCategoryMovie");
                });

            modelBuilder.Entity("CinameManageMent.Models.Movie", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("ntext");

                    b.Property<string>("Director")
                        .IsRequired()
                        .HasColumnType("Nvarchar(200)");

                    b.Property<int>("Duration")
                        .HasColumnType("int");

                    b.Property<string>("Picture")
                        .IsRequired()
                        .HasColumnType("varchar(200)");

                    b.Property<DateOnly>("ReleaseDate")
                        .HasColumnType("Date");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("Varchar(200)");

                    b.Property<string>("Trailer")
                        .IsRequired()
                        .HasColumnType("varchar(200)");

                    b.HasKey("Id");

                    b.ToTable("Movie");
                });

            modelBuilder.Entity("CinameManageMent.Models.Detail_Actor_Movie", b =>
                {
                    b.HasOne("CinameManageMent.Models.Actor", "Actor")
                        .WithMany()
                        .HasForeignKey("idActor")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CinameManageMent.Models.Movie", "Movie")
                        .WithMany()
                        .HasForeignKey("idMovie")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Actor");

                    b.Navigation("Movie");
                });

            modelBuilder.Entity("CinameManageMent.Models.Detail_Category_Movie", b =>
                {
                    b.HasOne("CinameManageMent.Models.Category", "Category")
                        .WithMany()
                        .HasForeignKey("IdCategory")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CinameManageMent.Models.Movie", "Movie")
                        .WithMany()
                        .HasForeignKey("IdMovie")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");

                    b.Navigation("Movie");
                });
#pragma warning restore 612, 618
        }
    }
}
