using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApi
{
	public class AccountData
	{
        public static List<Account> Accounts = new List<Account>
		{
			new Account {Id = 1, StartingBalance = 1000, CurrentBalance = 0, isChecking = true},
			new Account {Id = 2, StartingBalance = 5000, CurrentBalance = 0, isChecking = false}
		};
	}
}
