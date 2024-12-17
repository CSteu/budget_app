using BudgetApi.Data;
using BudgetApi.DTO;
using BudgetApi.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace BudgetApi
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransfersController : ControllerBase
    {
        private static List<Transfer> Transfers = TransferData.Transfers;
        private static List<Account> Accounts = AccountData.Accounts;

        // GET: api/transfers
        [HttpGet]
        public ActionResult<TransferDTO> GetTransfer()
        {
            var result = Transfers.Select(transfer => new TransferDTO
            {
                Id = transfer.Id,
                Amount = transfer.Amount,
                SendingAccount = Accounts.FirstOrDefault(a => a.Id == transfer.sendingAccountId)?.Name ?? "Unknown",
                ReceivingAccount = Accounts.FirstOrDefault(a => a.Id == transfer.recievingAccountId)?.Name ?? "Unknown",
                sendingAccountId = transfer.sendingAccountId,
                recievingAccountId = transfer.recievingAccountId,
                Date = transfer.Date
            });

            return Ok(result);
        }

        // POST: api/transfers
        [HttpPost]
        public ActionResult<Transfer> CreateTransfer([FromBody] Transfer newTransfer)
        {
            newTransfer.Id = Transfers.Any() ? Transfers.Max(t => t.Id) + 1 : 1;
            Transfers.Add(newTransfer);
            return CreatedAtAction(nameof(GetTransfer), new { id = newTransfer.Id }, newTransfer);
        }

        // PUT: api/transfers/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateTransfer(int id, [FromBody] Transfer updatedTransfer)
        {
            var transfer = Transfers.FirstOrDefault(t => t.Id == id);
            if (transfer == null) return NotFound();

            transfer.Amount = updatedTransfer.Amount;
            transfer.sendingAccountId = updatedTransfer.sendingAccountId;
            transfer.recievingAccountId = updatedTransfer.recievingAccountId;
            return NoContent();
        }
    }
}
