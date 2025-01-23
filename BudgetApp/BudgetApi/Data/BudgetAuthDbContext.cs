using BudgetApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BudgetApi.Data
{
	public class BudgetAuthDbContext : IdentityDbContext<IdentityUser>
	{
		public BudgetAuthDbContext(DbContextOptions<BudgetAuthDbContext> options) : base(options) { }

		public DbSet<Account> Accounts { get; set; }
		public DbSet<Transaction> Transactions { get; set; }
		public DbSet<Transfer> Transfers { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<Transaction>()
				.HasOne(t => t.User)
				.WithMany()
				.HasForeignKey(t => t.UserId)
				.OnDelete(DeleteBehavior.Cascade);

			modelBuilder.Entity<Transaction>()
				.Property(t => t.Type)
				.HasConversion<string>();
		}
	}
}
