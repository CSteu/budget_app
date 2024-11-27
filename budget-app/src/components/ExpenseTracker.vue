<template>
  <div class="expense-tracker">
    <h1>Expense Tracker</h1>
    <div class="content">
      <div class="expense-table-container">
        <DataTable
          :value="filteredExpenses"
          :paginator="true"
          :rows="8"
          responsiveLayout="scroll"
          class="expense-table"
        >
          <Column field="date" header="Date"></Column>
          <Column field="description" header="Description"></Column>
          <Column field="category" header="Category"></Column>
          <Column field="amount" header="Amount">
            <template #body="slotProps">
              {{ `$${slotProps.data.amount.toFixed(2)}` }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default {
  components: {
    DataTable,
    Column,
  },
  data() {
    return {
      timeFilter: "all",
      expenses: [
        { date: "2024-11-19", description: "Groceries", category: "Food", amount: 45.67 },
        { date: "2024-11-18", description: "Gas", category: "Transport", amount: 25.34 },
        { date: "2024-11-17", description: "Movie Night", category: "Entertainment", amount: 15.0 },
        { date: "2024-11-16", description: "Coffee", category: "Food", amount: 5.25 },
        { date: "2024-11-15", description: "Monthly Rent", category: "Housing", amount: 1200.0 },
        { date: "2024-11-14", description: "Electricity Bill", category: "Utilities", amount: 85.5 },
        { date: "2024-11-13", description: "Gym Membership", category: "Health", amount: 40.0 },
        { date: "2024-11-12", description: "Book Purchase", category: "Education", amount: 30.99 },
        { date: "2024-11-11", description: "Car Maintenance", category: "Transport", amount: 200.0 },
        { date: "2024-11-10", description: "Dining Out", category: "Entertainment", amount: 50.75 },
        { date: "2024-11-09", description: "Internet Bill", category: "Utilities", amount: 60.0 },
        { date: "2024-11-08", description: "Grocery Shopping", category: "Food", amount: 120.45 },
        { date: "2024-11-07", description: "Gas", category: "Transport", amount: 30.0 },
        { date: "2024-11-06", description: "Netflix", category: "Entertainment", amount: 15.99 },
        { date: "2024-11-05", description: "Pharmacy Purchase", category: "Health", amount: 18.75 },
        { date: "2024-11-04", description: "Stationery Supplies", category: "Education", amount: 12.5 },
        { date: "2024-11-03", description: "Clothing Purchase", category: "Shopping", amount: 75.0 },
        { date: "2024-11-02", description: "Gas", category: "Transport", amount: 35.5 },
        { date: "2024-11-01", description: "Dinner Date", category: "Entertainment", amount: 85.0 },
      ],
      filteredExpenses: [],
      chartData: null,
      chartOptions: {
        plugins: {
          legend: {
            display: true,
            position: "bottom",
          },
        },
      },
    };
  },
  computed: {
    expenseCategories() {
      return this.filteredExpenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
      }, {});
    },
  },
  methods: {
    formatCurrency(amount) {
      return `$${amount.toFixed(2)}`;
    },
    updateFilteredExpenses() {
      const now = new Date();
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const startOfYear = new Date(now.getFullYear(), 0, 1);

      this.filteredExpenses = this.expenses.filter((expense) => {
        const expenseDate = new Date(expense.date);
        if (this.timeFilter === "week") {
          return expenseDate >= startOfWeek;
        } else if (this.timeFilter === "month") {
          return expenseDate >= startOfMonth;
        } else if (this.timeFilter === "year") {
          return expenseDate >= startOfYear;
        }
        return true;
      });

      this.updateChartData();
    },
    updateChartData() {
      const categories = this.expenseCategories;
      this.chartData = {
        labels: Object.keys(categories),
        datasets: [
          {
            data: Object.values(categories),
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
          },
        ],
      };
    },
  },
  mounted() {
    this.updateFilteredExpenses();
  },
};
</script>

<style>
body {
  font-family: 'Poppins', sans-serif;
  background-color: #f0f2f5;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.expense-tracker {
  max-width: 1200px;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

h1 {
  font-weight: 600;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 1.5rem;
}

.content {
  display: flex;
  gap: 2rem;
}

.expense-table-container {
  flex: 1;
  min-width: 500px;
}

.expense-chart-container {
  flex: 1;
  min-width: 400px;
}

.expense-table .p-datatable {
  border: none;
}

.expense-table .p-datatable-header {
  display: none;
}

.expense-table .p-datatable-thead > tr > th {
  background-color: #ecf0f1;
  color: #2c3e50;
  font-weight: 600;
  text-align: left;
}

.expense-table .p-datatable-tbody > tr > td {
  border: none;
  padding: 0.75rem 0;
  color: #34495e;
  text-align: left;
  height: 2.5rem; 
}

.expense-table.fixed-height {
  min-height: calc(8 * 2.5rem + 4rem);
}

.p-datatable-wrapper {
  display: flex;
  flex-direction: column;
  height: 26rem;
}

.expense-table {
  flex-grow: 1;
  overflow: hidden;
}

.expense-table .p-datatable-wrapper {
  max-height: 30rem;
  overflow-y: auto;
}

.p-paginator {
  flex-shrink: 0;
  margin-top: 1rem;
}

.expense-chart {
  max-width: 100%;
  height: auto;
}

h2 {
  font-weight: 500;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 1rem;
}

.p-paginator {
  justify-content: center;
  gap: 1rem;
}

.p-paginator .p-paginator-pages .p-paginator-page {
  margin: 0 0.5rem;
}

.p-paginator .p-paginator-page {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background-color: #ecf0f1;
  color: #2c3e50;
  transition: all 0.3s ease;
}

.p-paginator .p-paginator-page.p-highlight {
  background-color: #75e5df;
  color: #ffffff;
  font-weight: bold;
}

.p-paginator .p-paginator-page:hover {
  background-color: #9be7e3;
  color: #ffffff;
}
</style>
