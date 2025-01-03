using BudgetApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BudgetApi
{
	[Route("api/[controller]")]
	[ApiController]
	public class AccountsController : ControllerBase
	{
		private readonly BudgetDbContext _context;

		public AccountsController(BudgetDbContext context)
		{
			_context = context;
		}

		// GET: api/Accounts
		[HttpGet]
		public async Task<ActionResult<IEnumerable<Account>>> GetAccounts()
		{
			var accounts = await _context.Accounts.ToListAsync();
			return Ok(accounts);
		}

		// POST: api/Accounts
		[HttpPost]
		public async Task<ActionResult<Account>> CreateAccount([FromBody] Account newAccount)
		{
			_context.Accounts.Add(newAccount);
			await _context.SaveChangesAsync();

			return CreatedAtAction(nameof(GetAccounts), new { id = newAccount.Id }, newAccount);
		}

		// PUT: api/Accounts/{id}
		[HttpPut("{id}")]
		public async Task<IActionResult> UpdateAccount(int id, [FromBody] Account updatedAccount)
		{
			if (id != updatedAccount.Id)
			{
				return BadRequest();
			}

			var existingAccount = await _context.Accounts.FindAsync(id);
			if (existingAccount == null)
			{
				return NotFound();
			}

			existingAccount.CurrentBalance = updatedAccount.CurrentBalance;
			existingAccount.IsChecking = updatedAccount.IsChecking;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!AccountExists(id))
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

		private bool AccountExists(int id)
		{
			return _context.Accounts.Any(e => e.Id == id);
		}
	}
}
