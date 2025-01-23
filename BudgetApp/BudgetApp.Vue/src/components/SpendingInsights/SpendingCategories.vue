<template>
  <div class="top-categories">
    <h2>Spending Categories</h2>
    <div class="chart-container">
      <Chart type="pie" :data="chartData" :options="chartOptions" class="w-full md:w-[30rem]" />
    </div>
    <div class="table-container">
      <div v-for="(category, index) in state.topCategories" :key="index" class="table-row">
        <span class="dot" :style="category.style"></span>
        <div class="category-wrapper">
          <div class="row-item category">
            <h3>{{ category.category }}</h3>
          </div>
          <div class="row-item transactions">
            {{ category.transactionCount }} Transactions
          </div>
        </div>
        <div class="row-item total">
          <h3>{{ formatCurrency(category.totalSpent) }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, reactive, watch, onMounted } from "vue";
import Chart from "primevue/chart";

const predefinedBlueShades = [
  '#03045e',
  '#023e8a',
  '#0077b6',
  '#0096c7',
  '#00b4d8',
];

// Inject unified transaction data
const transactionData = inject('transactionData');

const state = reactive({
  topCategories: [],
});

const chartData = reactive({
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: [],
    },
  ],
});

const chartOptions = reactive({
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem) => {
          const value = tooltipItem.raw;
          return `$${parseFloat(value).toFixed(2)}`;
        },
      },
    },
  },
});

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

const calculateTopCategories = () => {
  const transactions = Array.isArray(transactionData?.transactions)
    ? transactionData.transactions
    : [];
  const expenses = transactions.filter((transaction) => !transaction.isIncome);

  const today = new Date();
  const currentMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const nextMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

  const currentMonthExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= currentMonthStart && expenseDate < nextMonthStart;
  });

  const categoryStats = currentMonthExpenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = { transactionCount: 0, totalSpent: 0 };
    }
    acc[expense.category].transactionCount += 1;
    acc[expense.category].totalSpent += expense.amount;
    return acc;
  }, {});

  const topCategories = Object.entries(categoryStats)
    .map(([category, stats]) => ({
      category,
      ...stats,
    }))
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 5);

  topCategories.forEach((cat, index) => {
    cat.style = `background-color: ${predefinedBlueShades[index] || '#ccc'};`;
  });

  state.topCategories = topCategories;

  updateChart();
};

const updateChart = () => {
  chartData.labels = state.topCategories.map((cat) => cat.category);
  chartData.datasets[0].data = state.topCategories.map((cat) => parseFloat(cat.totalSpent.toFixed(2)));
  chartData.datasets[0].backgroundColor = predefinedBlueShades.slice(0, state.topCategories.length);
};

watch(
  () => transactionData?.transactions,
  () => {
    calculateTopCategories();
  },
  { deep: true }
);

onMounted(() => {
  calculateTopCategories();
});
</script>

<style scoped>
.top-categories {
  max-width: 600px;
  margin: 1rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.chart-container {
  margin-bottom: 2rem;
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
</style>
