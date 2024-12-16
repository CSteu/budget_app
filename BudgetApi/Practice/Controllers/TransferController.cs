using BudgetApi.Data;
using BudgetApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace BudgetApi
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        private static List<Transaction> Transactions = TransactionData.Transactions;


        // GET: api/transactions
        [HttpGet]
        public ActionResult<IEnumerable<Transaction>> GetTransactions()
        {
            return Ok(Transactions);
        }

        // GET: api/transactions/{id}
        [HttpGet("{id}")]
        public ActionResult<Transaction> GetTransaction(int id)
        {
            var transaction = Transactions.FirstOrDefault(t => t.Id == id);
            if (transaction == null) return NotFound();
            return Ok(transaction);
        }

        // POST: api/transactions
        [HttpPost]
        public ActionResult<Transaction> CreateTransaction([FromBody] Transaction newTransaction)
        {
            newTransaction.Id = Transactions.Any() ? Transactions.Max(t => t.Id) + 1 : 1;
            Transactions.Add(newTransaction);
            return CreatedAtAction(nameof(GetTransaction), new { id = newTransaction.Id }, newTransaction);
        }

        // PUT: api/transactions/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateTransaction(int id, [FromBody] Transaction updatedTransaction)
        {
            var transaction = Transactions.FirstOrDefault(t => t.Id == id);
            if (transaction == null) return NotFound();

            transaction.Description = updatedTransaction.Description;
            transaction.Amount = updatedTransaction.Amount;
            transaction.Date = updatedTransaction.Date;
            transaction.Category = updatedTransaction.Category;
            transaction.IsIncome = updatedTransaction.IsIncome;
            return NoContent();
        }

        // DELETE: api/transactions/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteTransaction(int id)
        {
            var transaction = Transactions.FirstOrDefault(t => t.Id == id);
            if (transaction == null) return NotFound();

            Transactions.Remove(transaction);
            return NoContent();
        }
    }
}