using BudgetApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApi.Data
{
    public class TransferData
    {
        public static List<Transfer> Transfers = new List<Transfer>
        {
            new Transfer {Id = 1, Amount = 500.00, sendingAccountId = 1, recievingAccountId = 2},
            new Transfer {Id = 2, Amount = 617.50, sendingAccountId = 1, recievingAccountId = 2},
        };
    }
}
