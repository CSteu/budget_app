using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApi
{
    public class Account
    {
        public int Id {  get; set; }

        public Double StartingBalance { get; set; }

        public Double CurrentBalance { get; set; }

        public bool isChecking { get; set; }
    }
}
