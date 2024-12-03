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
  inject: ["spendingData"],
  data() {
    return {
      timeFilter: "all",
      filteredExpenses: [],
    };
  },
  computed: {
    expenses() {
      return Array.isArray(this.spendingData?.expenses)
        ? this.spendingData.expenses
        : [];
    },
    expenseCategories() {
      return this.filteredExpenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
      }, {});
    },
  },
  methods: {
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
    },
  },
  watch: {
    "spendingData.expenses": {
      handler() {
        this.updateFilteredExpenses();
      },
      deep: true,
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 400px;
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

.p-datatable-wrapper {
  display: flex;
  flex-direction: column;
  height: 26rem;
}

.expense-table {
  flex-grow: 1;
  overflow: hidden;
}

.p-paginator {
  flex-shrink: 0;
  margin-top: 1rem;
  background-color: #ffffff;
}

.p-paginator .p-paginator-pages .p-paginator-page {
  margin: 0 0.5rem;
}

.p-paginator .p-paginator-page {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background-color: #ecf0f1;
  color: rgb(0, 162, 199);
  transition: all 0.3s ease;
  font-weight: 500;
}

.p-paginator .p-paginator-page-selected {
  background-color: rgb(0, 162, 199) !important;
  color: #ffffff !important;
}

.p-paginator .p-paginator-page:hover {
  background-color: #dcdedf !important;
  color: rgb(0, 162, 199) !important;
}

.p-datatable-paginator-bottom {
  border-style: none !important;
}

.p-datatable-table-container {
  min-height: 26rem;
}
</style>
