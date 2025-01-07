using BudgetApi.Controllers;
using BudgetApi.Models;
using Microsoft.AspNetCore.Mvc;
using Xunit;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

public class TransactionsControllerTests
{
	[Fact]
	public async Task GetTransactions_ReturnsAllTransactions()
	{
		// Arrange
		using var context = DbContextFactory.CreateInMemoryDbContext();
		context.Transactions.Add(new Transaction { Id = 1, Description = "Test 1", Amount = 100 });
		context.Transactions.Add(new Transaction { Id = 2, Description = "Test 2", Amount = 200 });
		await context.SaveChangesAsync();

		var controller = new TransactionsController(context);

		// Act
		var result = await controller.GetTransactions();
		var okResult = Assert.IsType<OkObjectResult>(result.Result);
		var transactions = Assert.IsAssignableFrom<IEnumerable<Transaction>>(okResult.Value);

		// Assert
		Assert.Equal(2, transactions.Count());
	}

	[Fact]
	public async Task GetTransaction_ExistingId_ReturnsTransaction()
	{
		// Arrange
		using var context = DbContextFactory.CreateInMemoryDbContext();
		context.Transactions.Add(new Transaction { Id = 1, Description = "Groceries", Amount = 50 });
		await context.SaveChangesAsync();

		var controller = new TransactionsController(context);

		// Act
		var result = await controller.GetTransaction(1);
		var okResult = Assert.IsType<OkObjectResult>(result.Result);
		var transaction = Assert.IsType<Transaction>(okResult.Value);

		// Assert
		Assert.Equal("Groceries", transaction.Description);
		Assert.Equal(50, transaction.Amount);
	}

	[Fact]
	public async Task GetTransaction_NonExistingId_ReturnsNotFound()
	{
		// Arrange
		using var context = DbContextFactory.CreateInMemoryDbContext();
		var controller = new TransactionsController(context);

		// Act
		var result = await controller.GetTransaction(999);

		// Assert
		Assert.IsType<NotFoundResult>(result.Result);
	}

	[Fact]
	public async Task CreateTransaction_ValidTransaction_ReturnsCreatedAtAction()
	{
		// Arrange
		using var context = DbContextFactory.CreateInMemoryDbContext();
		var controller = new TransactionsController(context);
		var newTransaction = new Transaction { Description = "Salary", Amount = 5000 };

		// Act
		var result = await controller.CreateTransaction(newTransaction);
		var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
		var createdTransaction = Assert.IsType<Transaction>(createdAtActionResult.Value);

		// Assert
		Assert.Equal("Salary", createdTransaction.Description);
		Assert.Equal(5000, createdTransaction.Amount);

		// Verify transaction is actually in the database
		Assert.Equal(1, await context.Transactions.CountAsync());
	}

	[Fact]
	public async Task UpdateTransaction_ValidId_UpdatesTransaction()
	{
		// Arrange
		using var context = DbContextFactory.CreateInMemoryDbContext();
		context.Transactions.Add(new Transaction { Id = 1, Description = "Old Description", Amount = 100 });
		await context.SaveChangesAsync();

		var controller = new TransactionsController(context);

		var transactionToUpdate = await context.Transactions.FindAsync(1);
		transactionToUpdate.Description = "New Description";
		transactionToUpdate.Amount = 150;

		// Act
		var result = await controller.UpdateTransaction(1, transactionToUpdate);

		// Assert
		Assert.IsType<NoContentResult>(result);

		// Verify the changes in the database
		var updatedTransaction = await context.Transactions.FindAsync(1);
		Assert.Equal("New Description", updatedTransaction.Description);
		Assert.Equal(150, updatedTransaction.Amount);
	}


	[Fact]
	public async Task UpdateTransaction_MismatchedId_ReturnsBadRequest()
	{
		// Arrange
		using var context = DbContextFactory.CreateInMemoryDbContext();
		var controller = new TransactionsController(context);

		var transaction = new Transaction { Id = 2, Description = "Mismatch", Amount = 99 };

		// Act
		var result = await controller.UpdateTransaction(1, transaction);

		// Assert
		Assert.IsType<BadRequestResult>(result);
	}

	[Fact]
	public async Task DeleteTransaction_ValidId_DeletesTransaction()
	{
		// Arrange
		using var context = DbContextFactory.CreateInMemoryDbContext();
		context.Transactions.Add(new Transaction { Id = 1, Description = "Test", Amount = 100 });
		await context.SaveChangesAsync();

		var controller = new TransactionsController(context);

		// Act
		var result = await controller.DeleteTransaction(1);

		// Assert
		Assert.IsType<NoContentResult>(result);
		Assert.Equal(0, await context.Transactions.CountAsync());
	}

	[Fact]
	public async Task DeleteTransaction_NonExistingId_ReturnsNotFound()
	{
		// Arrange
		using var context = DbContextFactory.CreateInMemoryDbContext();
		var controller = new TransactionsController(context);

		// Act
		var result = await controller.DeleteTransaction(999);

		// Assert
		Assert.IsType<NotFoundResult>(result);
	}

}
