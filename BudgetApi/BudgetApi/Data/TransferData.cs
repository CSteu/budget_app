﻿using BudgetApi.Models;
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
            new Transfer {Id = 1, Date = new DateTime(2024, 12, 1), Amount = 500.00, SendingAccountId = 1, RecievingAccountId = 2},
            new Transfer {Id = 2, Date = new DateTime(2024, 12, 15), Amount = 617.50, SendingAccountId = 1, RecievingAccountId = 2},
        };
    }
}
