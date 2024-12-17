using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BudgetApi.Models;

namespace BudgetApi.Data
{
    public class AccountData
    {
        public static List<Account> Accounts = new List<Account>
        {
            new Account {Id = 1, Name = "Checking Account", StartingBalance = 1000, CurrentBalance = 1000, isChecking = true},
            new Account {Id = 2, Name = "Savings Account", StartingBalance = 5000, CurrentBalance = 5000, isChecking = false}
        };
    }
}
