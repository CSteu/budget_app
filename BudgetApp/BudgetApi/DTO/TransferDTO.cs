using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApi.DTO
{
    public class TransferDTO
    {
        public int Id { get; set; }

        public double Amount { get; set; }
        public DateTime Date { get; set; }

        public string SendingAccount { get; set; }

        public string ReceivingAccount { get; set; }

        public int sendingAccountId { get; set; }

        public int recievingAccountId { get; set; }
    }
}
