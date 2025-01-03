using BudgetApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BudgetApi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class TransactionsController : ControllerBase
	{
		private readonly BudgetDbContext _context;

		public TransactionsController(BudgetDbContext context)
		{
			_context = context;
		}

		// GET: api/transactions
		[HttpGet]
		public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactions()
		{
			var transactions = await _context.Transactions.ToListAsync();
			return Ok(transactions);
		}

		// GET: api/transactions/{id}
		[HttpGet("{id}")]
		public async Task<ActionResult<Transaction>> GetTransaction(int id)
		{
			var transaction = await _context.Transactions.FindAsync(id);

			if (transaction == null)
			{
				return NotFound();
			}

			return Ok(transaction);
		}

		// POST: api/transactions
		[HttpPost]
		public async Task<ActionResult<Transaction>> CreateTransaction([FromBody] Transaction newTransaction)
		{
			_context.Transactions.Add(newTransaction);
			await _context.SaveChangesAsync();

			return CreatedAtAction(nameof(GetTransaction), new { id = newTransaction.Id }, newTransaction);
		}

		// PUT: api/transactions/{id}
		[HttpPut("{id}")]
		public async Task<IActionResult> UpdateTransaction(int id, [FromBody] Transaction updatedTransaction)
		{
			if (id != updatedTransaction.Id)
			{
				return BadRequest();
			}

			_context.Entry(updatedTransaction).State = EntityState.Modified;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!TransactionExists(id))
				{
					return NotFound();
				}
				else
				{
					throw;
				}
			}

			return NoContent();
		}

		// DELETE: api/transactions/{id}
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteTransaction(int id)
		{
			var transaction = await _context.Transactions.FindAsync(id);

			if (transaction == null)
			{
				return NotFound();
			}

			_context.Transactions.Remove(transaction);
			await _context.SaveChangesAsync();

			return NoContent();
		}

		private bool TransactionExists(int id)
		{
			return _context.Transactions.Any(e => e.Id == id);
		}
	}
}
