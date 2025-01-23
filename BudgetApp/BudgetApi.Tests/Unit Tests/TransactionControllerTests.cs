using BudgetApi.Controllers;
using BudgetApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Xunit;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

public class TransactionsControllerTests
{
	private static void AddUserContext(ControllerBase controller, string userId)
	{
		var user = new ClaimsPrincipal(new ClaimsIdentity(new[] { new Claim(ClaimTypes.NameIdentifier, userId) }));
		controller.ControllerContext = new ControllerContext
		{
			HttpContext = new DefaultHttpContext { User = user }
		};
	}

	[Fact]
	public async Task GetTransactions_ReturnsAllTransactionsForUser()
	{
		// Arrange
		using var context = DbContextFactory.CreateInMemoryDbContext();
		var userId = "user1";
		context.Transactions.Add(new Transaction { Id = 1, UserId = userId, Description = "Test 1", Amount = 100 });
		context.Transactions.Add(new Transaction { Id = 2, UserId = userId, Description = "Test 2", Amount = 200 });
		context.Transactions.Add(new Transaction { Id = 3, UserId = "user2", Description = "Other User", Amount = 300 });
		await context.SaveChangesAsync();

		var controller = new TransactionsController(context);
		AddUserContext(controller, userId);

		// Act
		var result = await controller.GetTransactions();
		var okResult = Assert.IsType<OkObjectResult>(result.Result);
		var transactions = Assert.IsAssignableFrom<IEnumerable<Transaction>>(okResult.Value);

		// Assert
		Assert.Equal(2, transactions.Count());
		Assert.All(transactions, t => Assert.Equal(userId, t.UserId));
	}

	[Fact]
	public async Task CreateTransaction_AssociatesTransactionWithUser()
	{
		// Arrange
		using var context = DbContextFactory.CreateInMemoryDbContext();
		var userId = "user1";
		var controller = new TransactionsController(context);
		AddUserContext(controller, userId);

		var newTransaction = new Transaction { Description = "Salary", Amount = 5000 };

		// Act
		var result = await controller.CreateTransaction(newTransaction);
		var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
		var createdTransaction = Assert.IsType<Transaction>(createdAtActionResult.Value);

		// Assert
		Assert.Equal("Salary", createdTransaction.Description);
		Assert.Equal(5000, createdTransaction.Amount);
		Assert.Equal(userId, createdTransaction.UserId);

		// Verify transaction is actually in the database
		Assert.Equal(1, await context.Transactions.CountAsync(t => t.UserId == userId));
	}

	[Fact]
	public async Task GetTransaction_ExistingIdAndUser_ReturnsTransaction()
	{
		// Arrange
		using var context = DbContextFactory.CreateInMemoryDbContext();
		var userId = "user1";
		context.Transactions.Add(new Transaction { Id = 1, UserId = userId, Description = "Groceries", Amount = 50 });
		await context.SaveChangesAsync();

		var controller = new TransactionsController(context);
		AddUserContext(controller, userId);

		// Act
		var result = await controller.GetTransaction(1);
		var okResult = Assert.IsType<OkObjectResult>(result.Result);
		var transaction = Assert.IsType<Transaction>(okResult.Value);

		// Assert
		Assert.Equal("Groceries", transaction.Description);
		Assert.Equal(50, transaction.Amount);
		Assert.Equal(userId, transaction.UserId);
	}

	[Fact]
	public async Task GetTransaction_NonExistingIdOrWrongUser_ReturnsNotFound()
	{
		// Arrange
		using var context = DbContextFactory.CreateInMemoryDbContext();
		var userId = "user1";
		context.Transactions.Add(new Transaction { Id = 1, UserId = "user2", Description = "Other User", Amount = 50 });
		await context.SaveChangesAsync();

		var controller = new TransactionsController(context);
		AddUserContext(controller, userId);

		// Act
		var result = await controller.GetTransaction(1);

		// Assert
		Assert.IsType<NotFoundResult>(result.Result);
	}

	[Fact]
	public async Task DeleteTransaction_ValidIdAndUser_DeletesTransaction()
	{
		// Arrange
		using var context = DbContextFactory.CreateInMemoryDbContext();
		var userId = "user1";
		context.Transactions.Add(new Transaction { Id = 1, UserId = userId, Description = "Test", Amount = 100 });
		await context.SaveChangesAsync();

		var controller = new TransactionsController(context);
		AddUserContext(controller, userId);

		// Act
		var result = await controller.DeleteTransaction(1);

		// Assert
		Assert.IsType<NoContentResult>(result);
		Assert.Equal(0, await context.Transactions.CountAsync(t => t.UserId == userId));
	}

	[Fact]
	public async Task DeleteTransaction_NonExistingIdOrWrongUser_ReturnsNotFound()
	{
		// Arrange
		using var context = DbContextFactory.CreateInMemoryDbContext();
		var userId = "user1";
		context.Transactions.Add(new Transaction { Id = 1, UserId = "user2", Description = "Other User", Amount = 100 });
		await context.SaveChangesAsync();

		var controller = new TransactionsController(context);
		AddUserContext(controller, userId);

		// Act
		var result = await controller.DeleteTransaction(1);

		// Assert
		Assert.IsType<NotFoundResult>(result);
	}
}
