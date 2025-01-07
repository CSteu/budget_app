using BudgetApi.Models;
using Microsoft.EntityFrameworkCore;

public static class DbContextFactory
{
	public static BudgetDbContext CreateInMemoryDbContext()
	{
		var options = new DbContextOptionsBuilder<BudgetDbContext>()
			.UseInMemoryDatabase(databaseName: $"BudgetDb_{Guid.NewGuid()}")
			.Options;

		return new BudgetDbContext(options);
	}
}
