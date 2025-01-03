using BudgetApi.Data;
using Microsoft.EntityFrameworkCore;

namespace BudgetApi.Models
{
	public class BudgetDbContext : DbContext
	{
		public BudgetDbContext(DbContextOptions<BudgetDbContext> options) : base(options) { }

		public DbSet<Account> Accounts { get; set; }
		public DbSet<Transaction> Transactions { get; set; }
		public DbSet<Transfer> Transfers { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<Transfer>().HasData(TransferData.Transfers);
		}
	}
}
