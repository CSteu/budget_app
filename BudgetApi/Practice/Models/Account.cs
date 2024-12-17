using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApi.Models
{
    public class Account
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public double StartingBalance { get; set; }

        public double CurrentBalance { get; set; }

        public bool isChecking { get; set; }
    }
}
