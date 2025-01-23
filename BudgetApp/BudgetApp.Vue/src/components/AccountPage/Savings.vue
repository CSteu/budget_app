<template>
  <div class="card">
    <div class="header">
      <div class="header-left">
        <h4>Savings Account</h4>
        <h1>{{ formatCurrency(currentBalance) }}</h1>
        <h3>Average Monthly Deposits: {{ formatCurrency(averageDeposits) }}</h3>
        <h3>Average Monthly Withdrawals: {{ formatCurrency(averageWithdrawals) }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['savingsData', 'transferData'],
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
    deposits() {
      if (!this.transferData || !Array.isArray(this.transferData.transfers)) return [];
      return this.transferData.transfers.filter(transfer => transfer.recievingAccountId === 2);
    },
    withdrawals() {
      if (!this.transferData || !Array.isArray(this.transferData.transfers)) return [];
      return this.transferData.transfers.filter(transfer => transfer.sendingAccountId === 2);
    },
    transactions() {
      return [...this.deposits, ...this.withdrawals];
    },
    currentBalance() {
      const totalDeposits = this.deposits.reduce((sum, deposit) => sum + (parseFloat(deposit.amount) || 0), 0);
      const totalWithdrawals = this.withdrawals.reduce((sum, withdrawal) => sum + (parseFloat(withdrawal.amount) || 0), 0);
      return this.startingAmount + totalDeposits - totalWithdrawals;
    },
    averageDeposits() {
      if (!this.deposits.length) return 0;
      const totalDeposits = this.deposits.reduce((sum, deposit) => sum + (parseFloat(deposit.amount) || 0), 0);
      const uniqueMonths = new Set(this.deposits.map(deposit => this.formatDateToMonth(deposit.date)));
      return this.roundToTwoDecimals(totalDeposits / (uniqueMonths.size || 1)); 
    },
    averageWithdrawals() {
      if (!this.withdrawals.length) return 0;
      const totalWithdrawals = this.withdrawals.reduce((sum, withdrawal) => sum + (parseFloat(withdrawal.amount) || 0), 0);
      const uniqueMonths = new Set(this.withdrawals.map(withdrawal => this.formatDateToMonth(withdrawal.date)));
      return this.roundToTwoDecimals(totalWithdrawals / (uniqueMonths.size || 1));
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
