using BudgetApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BudgetApi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ImportController : ControllerBase
	{
		private readonly BudgetDbContext _context;

		public ImportController(BudgetDbContext context)
		{
			_context = context;
		}

		// POST: api/import
		// Expects a JSON array of transactions in the body.
		[HttpPost]
		public async Task<ActionResult<IEnumerable<Transaction>>> ImportTransactions(
			[FromBody] List<Transaction> transactions)
		{
			if (transactions == null || transactions.Count == 0)
			{
				return BadRequest("No transaction data received.");
			}

			var newlyInserted = new List<Transaction>();

			foreach (var transaction in transactions)
			{ 
				if( 
					transaction.Type == "Debit Card" ||
					transaction.Type == "Direct Deposit"
				  )
				{
					if (transaction.Amount < 0)
					{
						transaction.Amount *= -1;
						transaction.IsIncome = false;
					}
					if(transaction.Type.Equals("Direct Deposit"))
					{
						transaction.IsIncome = true;
						transaction.Category = "Income";
					}
					_context.Transactions.Add(transaction);
					newlyInserted.Add(transaction);
				}
			}
			await _context.SaveChangesAsync();

			return Ok(newlyInserted);
		}
	}
}
