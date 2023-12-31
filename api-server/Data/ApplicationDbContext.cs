﻿using api_server.Data.Models;

using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api_server.Data
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : IdentityDbContext<ApplicationUser>(options)
    {
        public virtual DbSet<Listing> Listings { get; set; }
        public virtual DbSet<Image> Images { get; set; }
#pragma warning disable CS0114 // Member hides inherited member; missing override keyword
        public virtual DbSet<ApplicationUser> Users { get; set; }
#pragma warning restore CS0114 // Member hides inherited member; missing override keyword
        public virtual DbSet<Tag> Tags { get; set; }
        public virtual DbSet<UserRefreshTokens> UserRefreshToken { get; set; }

        public virtual DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Listing>()
                .HasOne(l => l.User)
                .WithMany(u => u.Listings)
                .HasForeignKey(l => l.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}