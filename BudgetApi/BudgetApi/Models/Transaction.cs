using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BudgetApi.Models
{
    public class Transaction
    {
        [Key]
        public int Id { get; set; }
        public string Description { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public string Category { get; set; } = string.Empty;
        public bool IsIncome { get; set; }
        public string Type { get; set; } = string.Empty;
        [JsonIgnore]
		[BindNever]
		public string? UserId { get; set; }
        [JsonIgnore]
		[BindNever]
		public IdentityUser? User { get; set; }
	}
}
