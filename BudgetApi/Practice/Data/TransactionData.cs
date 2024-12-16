using BudgetApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetApi.Data
{
    public class TransactionData
    {
        public static List<Transaction> Transactions = new List<Transaction>
        {
			// Recurring Car Payment (monthly)
			new Transaction { Id = 1, Description = "Car Payment", Amount = 349.75m, Date = new DateTime(2024, 1, 5), Category = "Auto", IsIncome = false },
            new Transaction { Id = 2, Description = "Car Payment", Amount = 349.75m, Date = new DateTime(2024, 2, 5), Category = "Auto", IsIncome = false },
            new Transaction { Id = 3, Description = "Car Payment", Amount = 349.75m, Date = new DateTime(2024, 3, 5), Category = "Auto", IsIncome = false },
            new Transaction { Id = 4, Description = "Car Payment", Amount = 349.75m, Date = new DateTime(2024, 4, 5), Category = "Auto", IsIncome = false },
            new Transaction { Id = 5, Description = "Car Payment", Amount = 349.75m, Date = new DateTime(2024, 5, 5), Category = "Auto", IsIncome = false },
            new Transaction { Id = 6, Description = "Car Payment", Amount = 349.75m, Date = new DateTime(2024, 6, 5), Category = "Auto", IsIncome = false },
            new Transaction { Id = 7, Description = "Car Payment", Amount = 349.75m, Date = new DateTime(2024, 7, 5), Category = "Auto", IsIncome = false },
            new Transaction { Id = 8, Description = "Car Payment", Amount = 349.75m, Date = new DateTime(2024, 8, 5), Category = "Auto", IsIncome = false },
            new Transaction { Id = 9, Description = "Car Payment", Amount = 349.75m, Date = new DateTime(2024, 9, 5), Category = "Auto", IsIncome = false },
            new Transaction { Id = 10, Description = "Car Payment", Amount = 349.75m, Date = new DateTime(2024, 10, 5), Category = "Auto", IsIncome = false },
            new Transaction { Id = 11, Description = "Car Payment", Amount = 349.75m, Date = new DateTime(2024, 11, 5), Category = "Auto", IsIncome = false },
            new Transaction { Id = 12, Description = "Car Payment", Amount = 349.75m, Date = new DateTime(2024, 12, 5), Category = "Auto", IsIncome = false },

			// Monthly Incomes and Spendings for Every Month
			new Transaction { Id = 13, Description = "Salary", Amount = 3025.43m, Date = new DateTime(2024, 1, 15), Category = "Income", IsIncome = true },
            new Transaction { Id = 14, Description = "Groceries", Amount = 1450.88m, Date = new DateTime(2024, 1, 10), Category = "Food", IsIncome = false },

            new Transaction { Id = 15, Description = "Salary", Amount = 2980.12m, Date = new DateTime(2024, 2, 15), Category = "Income", IsIncome = true },
            new Transaction { Id = 16, Description = "Electric Bill", Amount = 2100.45m, Date = new DateTime(2024, 2, 20), Category = "Utilities", IsIncome = false },

            new Transaction { Id = 17, Description = "Salary", Amount = 3120.75m, Date = new DateTime(2024, 3, 15), Category = "Income", IsIncome = true },
            new Transaction { Id = 18, Description = "Groceries", Amount = 1250.25m, Date = new DateTime(2024, 3, 7), Category = "Food", IsIncome = false },

            new Transaction { Id = 19, Description = "Salary", Amount = 2995.37m, Date = new DateTime(2024, 4, 15), Category = "Income", IsIncome = true },
            new Transaction { Id = 20, Description = "Dinner Out", Amount = 1895.43m, Date = new DateTime(2024, 4, 18), Category = "Entertainment", IsIncome = false },

            new Transaction { Id = 21, Description = "Salary", Amount = 3120.25m, Date = new DateTime(2024, 5, 15), Category = "Income", IsIncome = true },
            new Transaction { Id = 22, Description = "Water Bill", Amount = 1425.78m, Date = new DateTime(2024, 5, 22), Category = "Utilities", IsIncome = false },

            new Transaction { Id = 23, Description = "Salary", Amount = 3150.45m, Date = new DateTime(2024, 6, 15), Category = "Income", IsIncome = true },
            new Transaction { Id = 24, Description = "Car Maintenance", Amount = 2175.89m, Date = new DateTime(2024, 6, 10), Category = "Auto", IsIncome = false },

            new Transaction { Id = 25, Description = "Salary", Amount = 2999.99m, Date = new DateTime(2024, 7, 15), Category = "Income", IsIncome = true },
            new Transaction { Id = 26, Description = "Internet Bill", Amount = 1100.23m, Date = new DateTime(2024, 7, 25), Category = "Utilities", IsIncome = false },

            new Transaction { Id = 27, Description = "Salary", Amount = 2800.50m, Date = new DateTime(2024, 8, 15), Category = "Income", IsIncome = true },
            new Transaction { Id = 28, Description = "Groceries", Amount = 1987.50m, Date = new DateTime(2024, 8, 5), Category = "Food", IsIncome = false },

            new Transaction { Id = 29, Description = "Salary", Amount = 3100.75m, Date = new DateTime(2024, 9, 15), Category = "Income", IsIncome = true },
            new Transaction { Id = 30, Description = "Gas", Amount = 2150.12m, Date = new DateTime(2024, 9, 12), Category = "Transport", IsIncome = false },

            new Transaction { Id = 31, Description = "Salary", Amount = 3250.35m, Date = new DateTime(2024, 10, 15), Category = "Income", IsIncome = true },
            new Transaction { Id = 32, Description = "Clothing Purchase", Amount = 1450.99m, Date = new DateTime(2024, 10, 25), Category = "Clothing", IsIncome = false },

            new Transaction { Id = 33, Description = "Salary", Amount = 2999.89m, Date = new DateTime(2024, 11, 15), Category = "Income", IsIncome = true },
            new Transaction { Id = 34, Description = "Holiday Flights", Amount = 2499.75m, Date = new DateTime(2024, 11, 22), Category = "Travel", IsIncome = false },

			// December with extra transactions
			new Transaction { Id = 35, Description = "Salary", Amount = 3500.55m, Date = new DateTime(2024, 12, 15), Category = "Income", IsIncome = true },
            new Transaction { Id = 36, Description = "Holiday Gifts", Amount = 567.89m, Date = new DateTime(2024, 12, 10), Category = "Gifts", IsIncome = false },
            new Transaction { Id = 37, Description = "Travel", Amount = 800.75m, Date = new DateTime(2024, 12, 18), Category = "Travel", IsIncome = false },
            new Transaction { Id = 38, Description = "Groceries", Amount = 350.25m, Date = new DateTime(2024, 12, 5), Category = "Food", IsIncome = false },
            new Transaction { Id = 39, Description = "Holiday Dinner", Amount = 275.45m, Date = new DateTime(2024, 12, 24), Category = "Food", IsIncome = false },
            new Transaction { Id = 40, Description = "Electric Bill", Amount = 112.45m, Date = new DateTime(2024, 12, 2), Category = "Utilities", IsIncome = false },
            new Transaction { Id = 41, Description = "Internet Bill", Amount = 79.99m, Date = new DateTime(2024, 12, 12), Category = "Utilities", IsIncome = false },
            new Transaction { Id = 42, Description = "Holiday Decorations", Amount = 125.75m, Date = new DateTime(2024, 12, 1), Category = "Gifts", IsIncome = false },
            new Transaction { Id = 43, Description = "Streaming Subscription", Amount = 19.99m, Date = new DateTime(2024, 12, 3), Category = "Entertainment", IsIncome = false },
            new Transaction { Id = 44, Description = "Holiday Party Supplies", Amount = 234.87m, Date = new DateTime(2024, 12, 20), Category = "Food", IsIncome = false },
            new Transaction { Id = 45, Description = "Gas", Amount = 72.13m, Date = new DateTime(2024, 12, 8), Category = "Transport", IsIncome = false },
            new Transaction { Id = 46, Description = "Coffee Shop", Amount = 18.45m, Date = new DateTime(2024, 12, 6), Category = "Food", IsIncome = false },
            new Transaction { Id = 47, Description = "Restaurant Dinner", Amount = 89.23m, Date = new DateTime(2024, 12, 11), Category = "Food", IsIncome = false },
            new Transaction { Id = 48, Description = "Car Wash", Amount = 24.99m, Date = new DateTime(2024, 12, 4), Category = "Auto", IsIncome = false },
            new Transaction { Id = 49, Description = "Charitable Donation", Amount = 500.00m, Date = new DateTime(2024, 12, 25), Category = "Charity", IsIncome = false },
            new Transaction { Id = 50, Description = "Groceries", Amount = 123.75m, Date = new DateTime(2024, 12, 7), Category = "Food", IsIncome = false },
            new Transaction { Id = 51, Description = "Movie Tickets", Amount = 45.00m, Date = new DateTime(2024, 12, 26), Category = "Entertainment", IsIncome = false },
            new Transaction { Id = 52, Description = "New Year's Party Supplies", Amount = 199.95m, Date = new DateTime(2024, 12, 28), Category = "Entertainment", IsIncome = false },
            new Transaction { Id = 53, Description = "Hotel Booking", Amount = 489.65m, Date = new DateTime(2024, 12, 22), Category = "Travel", IsIncome = false },
            new Transaction { Id = 54, Description = "Grocery Store", Amount = 150.45m, Date = new DateTime(2024, 12, 16), Category = "Food", IsIncome = false },
            new Transaction { Id = 55, Description = "Online Shopping", Amount = 250.65m, Date = new DateTime(2024, 12, 9), Category = "Shopping", IsIncome = false },
            new Transaction { Id = 56, Description = "Holiday Gift for Mom", Amount = 349.75m, Date = new DateTime(2024, 12, 13), Category = "Gifts", IsIncome = false },
            new Transaction { Id = 57, Description = "Holiday Gift for Dad", Amount = 275.60m, Date = new DateTime(2024, 12, 14), Category = "Gifts", IsIncome = false },
            new Transaction { Id = 58, Description = "New Headphones", Amount = 129.99m, Date = new DateTime(2024, 12, 17), Category = "Electronics", IsIncome = false },
            new Transaction { Id = 59, Description = "New Year’s Eve Taxi Ride", Amount = 45.50m, Date = new DateTime(2024, 12, 31), Category = "Transport", IsIncome = false },
            new Transaction { Id = 60, Description = "Gift Wrapping Supplies", Amount = 25.45m, Date = new DateTime(2024, 12, 9), Category = "Gifts", IsIncome = false },
            new Transaction { Id = 69, Description = "Holiday Bonus", Amount = 2500.00m, Date = new DateTime(2024, 12, 22), Category = "Income", IsIncome = true }

        };
    }
}
