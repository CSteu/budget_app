using BudgetApi.Data;
using BudgetApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BudgetApi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class TransfersController : ControllerBase
	{
		private readonly BudgetAuthDbContext _context;

		public TransfersController(BudgetAuthDbContext context)
		{
			_context = context;
		}

		// GET: api/transfers
		[HttpGet]
		public async Task<ActionResult<IEnumerable<Transfer>>> GetTransfers()
		{
			var transfers = await _context.Transfers.ToListAsync();
			return Ok(transfers);
		}

		// POST: api/transfers
		[HttpPost]
		public async Task<ActionResult<Transfer>> CreateTransfer([FromBody] Transfer newTransfer)
		{
			_context.Transfers.Add(newTransfer);
			await _context.SaveChangesAsync();

			return CreatedAtAction(nameof(GetTransfers), new { id = newTransfer.Id }, newTransfer);
		}

		// PUT: api/transfers/{id}
		[HttpPut("{id}")]
		public async Task<IActionResult> UpdateTransfer(int id, [FromBody] Transfer updatedTransfer)
		{
			if (id != updatedTransfer.Id)
			{
				return BadRequest();
			}

			var transfer = await _context.Transfers.FindAsync(id);
			if (transfer == null)
			{
				return NotFound();
			}

			transfer.Amount = updatedTransfer.Amount;
			transfer.Date = updatedTransfer.Date;
			transfer.SendingAccountId = updatedTransfer.SendingAccountId;
			transfer.RecievingAccountId = updatedTransfer.RecievingAccountId;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!TransferExists(id))
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

		private bool TransferExists(int id)
		{
			return _context.Transfers.Any(e => e.Id == id);
		}
	}
}
