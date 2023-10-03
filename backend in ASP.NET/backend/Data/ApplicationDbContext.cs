using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Models.Task>().Property(x=>x.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<Models.Task>().Property(x => x.Content).IsRequired();
            modelBuilder.Entity<Models.Task>().Property(x => x.DueDate).IsRequired(false);
            modelBuilder.Entity<Models.Task>().Property(x => x.IsCompleted).IsRequired();
        }

        public DbSet<Models.Task> Tasks { get; set; }
    }
}
