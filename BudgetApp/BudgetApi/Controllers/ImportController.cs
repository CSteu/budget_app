using System.Security.Claims;
using BudgetApi.Data;
using BudgetApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BudgetApi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class ImportController : ControllerBase
	{
		private readonly BudgetAuthDbContext _context;

		public ImportController(BudgetAuthDbContext context)
		{
			_context = context;
		}

		[HttpPost]
		public async Task<ActionResult<IEnumerable<Transaction>>> ImportTransactions(
		[FromBody] List<Transaction> transactions)
		{
			if (transactions == null || transactions.Count == 0)
			{
				return BadRequest("No transaction data received.");
			}

			var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
			if (string.IsNullOrEmpty(userId))
			{
				return Unauthorized("User is not authenticated.");
			}

			var newlyInserted = new List<Transaction>();

			foreach (var transaction in transactions)
			{
				if (transaction.Type == "Debit Card" || transaction.Type == "Direct Deposit")
				{
					transaction.UserId = userId;

					if (transaction.Amount < 0)
					{
						transaction.Amount *= -1;
						transaction.IsIncome = false;
					}

					if (transaction.Type.Equals("Direct Deposit"))
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
