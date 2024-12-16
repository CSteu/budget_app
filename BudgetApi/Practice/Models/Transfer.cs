using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApi.Models
{
    public class Transfer
    {
        public int Id { get; set; }

        public double Amount { get; set; }

        public int sendingAccountId { get; set; }

        public int recievingAccountId { get; set; }
    }
}
