using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApi.Models
{
    public class Transfer
    {
        [Key]
        public int Id { get; set; }

        public double Amount { get; set; }
        public DateTime Date { get; set; }

        public int SendingAccountId { get; set; }

        public int RecievingAccountId { get; set; }
    }
}
