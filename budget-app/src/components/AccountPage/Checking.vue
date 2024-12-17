<template>
  <div class="card">
    <div class="header">
      <div class="header-button">
        <h4>Checking Account</h4>
        <button @click="goToSetStartingAmount" class="edit-starting-btn">Edit starting amount</button>
      </div>
      <h1>{{ formatCurrency(currentBalance) }}</h1>
      <h3>Average Monthly Income: {{ formatCurrency(averageIncome) }}</h3>
      <h3>Average Monthly Expenses: {{ formatCurrency(averageExpenses) }}</h3>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  
  inject: ['checkingData', 'transferData', 'spendingData', 'incomeData'],
  data() {
    return {
      currentMonthKey: this.getCurrentMonthKey(),
      router: useRouter(),
    }
  },
  computed: {
    startingAmount() {
      if (!this.checkingData || !Array.isArray(this.checkingData.checkingAmount) || this.checkingData.checkingAmount.length === 0) {
        return 0;
      }
      const firstAccount = this.checkingData.checkingAmount[0];
      return firstAccount && firstAccount.startingBalance ? parseFloat(firstAccount.startingBalance) || 0 : 0;
    },
    expenses() {
      return Array.isArray(this.spendingData?.expenses) ? this.spendingData.expenses : [];
    },
    incomes() {
      return Array.isArray(this.incomeData?.incomes) ? this.incomeData.incomes : [];
    },
    deposits() {
      if (!this.transferData || !Array.isArray(this.transferData.transfers)) return [];
      return this.transferData.transfers.filter(transfer => transfer.recievingAccountId === 1);
    },
    withdrawals() {
      if (!this.transferData || !Array.isArray(this.transferData.transfers)) return [];
      return this.transferData.transfers.filter(transfer => transfer.sendingAccountId === 1);
    },
    transactions() {
      return [...this.deposits, ...this.withdrawals];
    },
    currentBalance() {
      const totalIncome = this.incomes.reduce((sum, income) => sum + (parseFloat(income.amount) || 0), 0);
      const totalExpenses = this.expenses.reduce((sum, expense) => sum + (parseFloat(expense.amount) || 0), 0);
      const totalDeposits = this.deposits.reduce((sum, deposit) => sum + (parseFloat(deposit.amount) || 0), 0);
      const totalWithdrawals = this.withdrawals.reduce((sum, withdrawal) => sum + (parseFloat(withdrawal.amount) || 0), 0);
      const balance = this.startingAmount + totalIncome - totalExpenses + totalDeposits - totalWithdrawals;
      return this.roundToTwoDecimals(balance);
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
    goToSetStartingAmount(){
      this.router.push('/starting-amount');
    },
    async updateCurrentBalance(balance) {
      try {
        const accountId = 1;
        const payload = {
          currentBalance: balance,
          Name: "test",
          isChecking: true
        };
        await axios.put(`https://localhost:5001/api/accounts/${accountId}`, payload);
      } catch (error) {
        console.error('Failed to update current balance:', error);
      }
    }
  },
  watch: {
    currentBalance: {
      handler(newBalance) {
        this.updateCurrentBalance(newBalance);
      },
      immediate: true,
    }
  }
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 25rem;
}

.header-button {
  width: 100%;
  display:flex;
  justify-content: space-between;
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

.edit-starting-btn {
  background-color: #ffffff;
  color: rgb(0, 162, 199);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  align-self: flex-start;
}

.edit-starting-btn:hover {
  color: rgb(0, 106, 130);
}
</style>
