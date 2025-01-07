<template>
  <div class="card">
    <div class="header">
      <div class="header-left">
        <h4 id="currentMonth">{{ currentMonth }} Spending</h4>
        <h1>{{ formattedTotalSpending }}</h1>
        <h3>{{ formattedLeftToSpend }} Left To Spend</h3>
      </div>
      <button @click="goToEditBudget" class="edit-budget-btn">Edit spending target</button>
    </div>
    <div class="body">
      <Chart type="line" :data="chartData" :options="chartOptions" class="h-chart" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import Chart from "primevue/chart";

const router = useRouter();
const spendingData = inject("spendingData");

const chartData = ref();
const chartOptions = ref();
const currentMonth = ref("");
const targetSpending = ref(parseFloat(localStorage.getItem("targetSpending")) || 1000);
const expenses = computed(() =>
  Array.isArray(spendingData?.expenses) ? spendingData.expenses : []
);

const totalSpending = computed(() => {
  const today = new Date();
  const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const nextMonthStart = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  return expenses.value
    .filter((expense) => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= currentMonthStart && expenseDate < nextMonthStart;
    })
    .reduce((total, expense) => total + expense.amount, 0);
});

const leftToSpend = computed(() =>
  Math.max(targetSpending.value - totalSpending.value, 0)
);
const formattedTotalSpending = computed(() => `$${totalSpending.value.toFixed(2)}`);
const formattedLeftToSpend = computed(() => `$${leftToSpend.value.toFixed(2)}`);

const setCurrentMonth = () => {
  const today = new Date();
  currentMonth.value = today.toLocaleString("default", { month: "long" });
};

const setChartData = () => {
  const today = new Date();
  const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const nextMonthStart = new Date(today.getFullYear(), today.getMonth() + 1, 1);

  const filteredExpenses = expenses.value.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= currentMonthStart && expenseDate < nextMonthStart;
  });

  filteredExpenses.sort((a, b) => new Date(a.date) - new Date(b.date));

  let cumulativeTotal = 0;
  const labels = [];
  const data = [];

  let currentDate = new Date(currentMonthStart);
  const endDate = new Date(nextMonthStart);

  while (currentDate < endDate) {
    const dateLabel = currentDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    labels.push(dateLabel);

    const dailyExpenses = filteredExpenses.filter(
      (expense) => new Date(expense.date).toDateString() === currentDate.toDateString()
    );
    dailyExpenses.forEach((expense) => {
      cumulativeTotal += expense.amount;
    });
    data.push(cumulativeTotal);

    currentDate.setDate(currentDate.getDate() + 1);
  }

  chartData.value = {
    labels,
    datasets: [
      {
        label: "Cumulative Spending",
        data,
        borderColor: "#0077b6",
        backgroundColor: "rgba(0, 183, 229, 0.2)",
        fill: true,
        pointRadius: 0,
        tension: 0.05,
      },
    ],
  };
};

const setChartOptions = () => {
  chartOptions.value = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      annotation: {
        annotations: {
          targetLine: {
            type: 'line',
            yMin: targetSpending.value,
            yMax: targetSpending.value,
            borderColor: 'red',
            borderWidth: 2,
            label: {
              content: 'Target Spending',
              enabled: true,
              position: 'start',
              backgroundColor: 'red',
              color: 'white'
            }
          },
          currentSpendingLabel: {
            type: 'label',
            xValue: chartData.value
              ? chartData.value.labels[chartData.value.labels.length - 1]
              : '',
            yValue: totalSpending.value,
            content: [`Current: $${totalSpending.value.toFixed(2)}`],
            color: 'white',
            backgroundColor: '#0077b6',
            borderRadius: 4,
            padding: 6,
            position: 'end',
            textAlign: 'left',
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: "#333",
          autoSkip: true,
          maxTicksLimit: 10,
        },
        grid: {
          color: "#e0e0e0",
        },
      },
      y: {
        ticks: {
          color: "#333",
        },
        grid: {
          color: "#e0e0e0",
        },
        suggestedMax: 1.5 * totalSpending.value,
      },
    },
  };
};

const goToEditBudget = () => {
  router.push("/edit-budget");
};

watch(
  () => spendingData?.expenses,
  () => {
    setChartData();
  },
  { deep: true }
);

onMounted(() => {
  setCurrentMonth();
  setChartData();
  setChartOptions();
});
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

.body {
  display: flex;
  justify-content: center;
  align-items: center;
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

.header h3 {
  color: #9b9b9b;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.header h4 {
  color: var(--vt-c-text-dark-2);
  font-weight: 600;
}

.edit-budget-btn {
  padding: 0.5rem 1rem;
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

.edit-budget-btn:hover {
  color: rgb(1, 137, 168);
}

.h-chart {
  height: 20rem;
  width: 95%;
}
</style>
