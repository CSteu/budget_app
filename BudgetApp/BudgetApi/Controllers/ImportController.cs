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

			var categoryCache = await GetCategoryCacheAsync(userId);

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
					else
					{
						if (string.IsNullOrEmpty(transaction.Category) &&
							categoryCache.ContainsKey(transaction.Description))
						{
							transaction.Category = categoryCache[transaction.Description];
						}
					}
					_context.Transactions.Add(transaction);
					newlyInserted.Add(transaction);
				}
			}

			await _context.SaveChangesAsync();
			return Ok(newlyInserted);
		}

		private async Task<Dictionary<string, string>> GetCategoryCacheAsync(string userId)
		{
			return await _context.Transactions
				.Where(t => t.UserId == userId && !string.IsNullOrEmpty(t.Category))
				.GroupBy(t => t.Description)
				.Select(g => new { Description = g.Key, Category = g.Max(x => x.Category) })
				.ToDictionaryAsync(x => x.Description, x => x.Category);
		}

	}
}
