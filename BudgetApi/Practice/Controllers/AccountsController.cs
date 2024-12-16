using BudgetApi.Data;
using BudgetApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace BudgetApi
{
    [Route("api/[controller]")]
	[ApiController]
	public class AccountsController : ControllerBase
	{
		private static List<Account> Accounts = AccountData.Accounts;


		// GET: api/Account
		[HttpGet]
		public ActionResult<IEnumerable<Account>> GetAccounts()
		{
			return Ok(Accounts);
		}


		// POST: api/Accounts
		[HttpPost]
		public ActionResult<Account> CreateAccount([FromBody] Account newAccount)
		{
            newAccount.Id = Accounts.Any() ? Accounts.Max(t => t.Id) + 1 : 1;
			Accounts.Add(newAccount);
			return CreatedAtAction(nameof(GetAccounts), new { id = newAccount.Id }, newAccount);
		}

        // PUT: api/Accounts/{id}
        [HttpPut("{id}")]
        public ActionResult UpdateAccount(int id, [FromBody] Account updatedAccount)
        {
            var existingAccount = Accounts.FirstOrDefault(account => account.Id == id);
            if (existingAccount == null)
            {
                return NotFound();
            }

            existingAccount.StartingBalance = updatedAccount.StartingBalance;
            existingAccount.CurrentBalance = updatedAccount.CurrentBalance;
            existingAccount.isChecking = updatedAccount.isChecking;
            return NoContent();
        }
    }
}
