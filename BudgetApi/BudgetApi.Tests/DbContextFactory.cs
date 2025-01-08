using BudgetApi.Data;
using Microsoft.EntityFrameworkCore;

public static class DbContextFactory
{
	public static BudgetAuthDbContext CreateInMemoryDbContext()
	{
		var options = new DbContextOptionsBuilder<BudgetAuthDbContext>()
			.UseInMemoryDatabase(databaseName: $"BudgetDb_{Guid.NewGuid()}")
			.Options;

		return new BudgetAuthDbContext(options);
	}
}
