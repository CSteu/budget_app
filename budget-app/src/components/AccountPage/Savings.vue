<template>
  <div class="card">
    <div class="header">
      <div class="header-left">
        <h4>Savings Account</h4>
        <h1>{{ formatCurrency(currentBalance) }}</h1>
        <h2>Current Balance</h2>
        <h3>Average Monthly Income: {{ formatCurrency(averageIncome) }}</h3>
        <h3>Average Monthly Expenses: {{ formatCurrency(averageExpenses) }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['savingsData', 'spendingData', 'incomeData'],
  data() {
    return {
      currentMonthKey: this.getCurrentMonthKey(),
    }
  },
  computed: {
    startingAmount() {
      if (!this.savingsData || !Array.isArray(this.savingsData.SavingsAmount) || this.savingsData.SavingsAmount.length === 0) {
        return 0;
      }
      const firstAccount = this.savingsData.SavingsAmount[0];
      return firstAccount && firstAccount.startingBalance ? parseFloat(firstAccount.startingBalance) || 0 : 0;
    },
    expenses() {
      return Array.isArray(this.spendingData?.expenses) ? this.spendingData.expenses : [];
    },
    incomes() {
      return Array.isArray(this.incomeData?.incomes) ? this.incomeData.incomes : [];
    },
    transactions() {
      return [...this.expenses, ...this.incomes];
    },
    currentBalance() {
      const totalIncome = this.incomes.reduce((sum, income) => sum + (parseFloat(income.amount) || 0), 0);
      const totalExpenses = this.expenses.reduce((sum, expense) => sum + (parseFloat(expense.amount) || 0), 0);
      return this.startingAmount + totalIncome - totalExpenses;
    },
    averageIncome() {
      if (!this.incomes.length) return 0;
      const totalIncome = this.incomes.reduce((sum, income) => sum + (parseFloat(income.amount) || 0), 0);
      const uniqueMonths = new Set(this.incomes.map(income => this.formatDateToMonth(income.date)));
      return this.roundToTwoDecimals(totalIncome / uniqueMonths.size);
    },
    averageExpenses() {
      if (!this.expenses.length) return 0;
      const totalExpenses = this.expenses.reduce((sum, expense) => sum + (parseFloat(expense.amount) || 0), 0);
      const uniqueMonths = new Set(this.expenses.map(expense => this.formatDateToMonth(expense.date)));
      return this.roundToTwoDecimals(totalExpenses / uniqueMonths.size);
    },
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    },
    formatDateToMonth(dateStr) {
      const date = new Date(dateStr);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      return `${year}-${month}`;
    },
    getCurrentMonthKey() {
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      return `${year}-${month}`;
    },
    roundToTwoDecimals(value) {
      return Math.round((value + Number.EPSILON) * 100) / 100;
    },
  },
}
</script>

<style scoped>
.card {
  width: 100%;
  margin: 1rem auto;
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.header {
  display: flex;
  justify-content: space-between;
}

.header-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.header h1 {
  font-size: 2rem;
  margin: 0;
}

.header h2 {
  font-size: 1.1rem;
  margin: 0;
  color: cadetblue;
}

.header h3 {
  color: #9b9b9b;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.header h4 {
  color: var(--vt-c-text-dark-2);
  font-weight: 600;
}
</style>
