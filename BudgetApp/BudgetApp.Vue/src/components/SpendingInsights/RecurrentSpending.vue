<template>
  <div class="recurring-transactions">
    <h2>Recurring Transactions</h2>
    <div class="table-container">
      <div v-if="state.recurringItems.length > 0">
        <div v-for="(item, index) in state.recurringItems" :key="index" class="table-row">
          <span class="dot" :style="item.style"></span>
          <div class="category-wrapper">
            <div class="row-item category">
              <h3>{{ item.name }}</h3>
            </div>
            <div class="row-item transactions">
              {{ item.months.length }} Consecutive Months
            </div>
          </div>
          <div class="row-item total">
            <h3>${{ item.amount.toFixed(2) }}</h3>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="no-data">No recurring transactions detected.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, reactive, onMounted, watch } from "vue";

// Inject unified transaction data
const transactionData = inject('transactionData');

const state = reactive({
  recurringItems: [],
});

const predefinedBlueShades = [
  '#03045e',
  '#023e8a',
  '#0077b6',
  '#0096c7',
  '#00b4d8',
];

const calculateRecurringTransactions = () => {
  const transactions = Array.isArray(transactionData?.transactions)
    ? transactionData.transactions
    : [];

  if (transactions.length === 0) {
    state.recurringItems = [];
    return;
  }

  const grouped = transactions.reduce((acc, transaction) => {
    const name = transaction.name || transaction.description || 'Unknown';
    const key = `${name}-${transaction.amount}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(transaction);
    return acc;
  }, {});

  const recurring = Object.entries(grouped)
    .filter(([_, records]) => {
      const months = new Set(records.map((rec) => rec.date.slice(0, 7)));
      return months.size >= 3;
    })
    .map(([key, records]) => {
      const [name, amount] = key.split("-");
      return {
        name,
        amount: parseFloat(amount),
        months: [...new Set(records.map((rec) => rec.date.slice(0, 7)))],
      };
    })
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);

  recurring.forEach((item, index) => {
    item.style = `background-color: ${predefinedBlueShades[index] || '#ccc'};`;
  });

  state.recurringItems = recurring;
};

watch(
  () => transactionData?.transactions,
  () => {
    calculateRecurringTransactions();
  },
  { deep: true }
);

onMounted(() => {
  calculateRecurringTransactions();
});
</script>

<style scoped>
.recurring-transactions {
  max-width: 600px;
  margin: 1rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

h2 {
  font-weight: 600;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 1.5rem;
}

h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  text-align: center;
}

.table-container {
  max-width: 100%;
  overflow-x: auto;
}

.table-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #ecf0f1;
}

.table-row:last-child {
  border-bottom: none;
}

.row-item {
  flex: 1;
  text-align: center;
}

.row-item.category {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.row-item.transactions {
  font-size: 0.8rem;
  font-weight: 400;
  color: #555;
  text-align: left;
}

.row-item.total {
  justify-content: right;
  display: flex;
}

.dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.no-data {
  text-align: center;
  font-size: 1rem;
  color: #888;
}
</style>
