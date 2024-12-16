using BudgetApi.Data;
using BudgetApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace BudgetApi
{
    [Route("api/[controller]")]
	[ApiController]
	public class TransfersController : ControllerBase
	{
		private static List<Transfer> Transfers = TransferData.Transfers;


		// GET: api/transactions
		[HttpGet]
		public ActionResult<IEnumerable<Transfer>> GetTransfer()
		{
			return Ok(Transfers);
		}

		// POST: api/transactions
		[HttpPost]
		public ActionResult<Transaction> CreateTransfer([FromBody] Transfer newTransfer)
		{
            newTransfer.Id = Transfers.Any() ? Transfers.Max(t => t.Id) + 1 : 1;
            Transfers.Add(newTransfer);
			return CreatedAtAction(nameof(GetTransfer), new { id = newTransfer.Id }, newTransfer);
		}

		// PUT: api/transactions/{id}
		[HttpPut("{id}")]
		public IActionResult UpdateTransfer(int id, [FromBody] Transfer updatedTransfer)
		{
			var transaction = Transfers.FirstOrDefault(t => t.Id == id);
			if (transaction == null) return NotFound();

			transaction.Amount = updatedTransfer.Amount;
			transaction.sendingAccountId = updatedTransfer.sendingAccountId;
			transaction.recievingAccountId = updatedTransfer.recievingAccountId;
			return NoContent();
		}
	}
}
