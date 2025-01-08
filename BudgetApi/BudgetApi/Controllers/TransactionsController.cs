using System.Security.Claims;
using BudgetApi.Data;
using BudgetApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BudgetApi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class TransactionsController : ControllerBase
	{
		private readonly BudgetAuthDbContext _context;

		public TransactionsController(BudgetAuthDbContext context)
		{
			_context = context;
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactions()
		{
			var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
			var transactions = await _context.Transactions
				.Where(t => t.UserId == userId)
				.ToListAsync();
			return Ok(transactions);
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<Transaction>> GetTransaction(int id)
		{
			var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
			var transaction = await _context.Transactions
				.Where(t => t.Id == id && t.UserId == userId)
				.FirstOrDefaultAsync();
			if (transaction == null)
			{
				return NotFound();
			}
			return Ok(transaction);
		}

		[HttpPost]
		public async Task<ActionResult<Transaction>> CreateTransaction([FromBody] Transaction newTransaction)
		{
			var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
			newTransaction.UserId = userId;
			_context.Transactions.Add(newTransaction);
			await _context.SaveChangesAsync();
			return CreatedAtAction(nameof(GetTransaction), new { id = newTransaction.Id }, newTransaction);
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> UpdateTransaction(int id, [FromBody] Transaction updatedTransaction)
		{
			if (id != updatedTransaction.Id)
			{
				return BadRequest();
			}
			var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
			var existingTransaction = await _context.Transactions
				.Where(t => t.Id == id && t.UserId == userId)
				.FirstOrDefaultAsync();
			if (existingTransaction == null)
			{
				return NotFound();
			}
			existingTransaction.Description = updatedTransaction.Description;
			existingTransaction.Amount = updatedTransaction.Amount;
			existingTransaction.Date = updatedTransaction.Date;
			existingTransaction.Category = updatedTransaction.Category;
			existingTransaction.IsIncome = updatedTransaction.IsIncome;
			existingTransaction.Type = updatedTransaction.Type;
			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!TransactionExists(id, userId))
				{
					return NotFound();
				}
				throw;
			}
			return NoContent();
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteTransaction(int id)
		{
			var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
			var transaction = await _context.Transactions
				.Where(t => t.Id == id && t.UserId == userId)
				.FirstOrDefaultAsync();
			if (transaction == null)
			{
				return NotFound();
			}
			_context.Transactions.Remove(transaction);
			await _context.SaveChangesAsync();
			return NoContent();
		}

		private bool TransactionExists(int id, string userId)
		{
			return _context.Transactions.Any(e => e.Id == id && e.UserId == userId);
		}
	}
}
