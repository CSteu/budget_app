<template>
    <div class="card">
      <div class="header">
        <h4 id="currentMonth">{{ currentMonth }} Spending</h4>
        <h1>{{ formattedTotalSpending }}</h1>
        <h3>{{ leftToSpend }}</h3>
      </div>
      <Chart type="line" :data="chartData" :options="chartOptions" class="h-chart" />
    </div>
  </template>
  
  <script setup>
  import { ref, computed, inject, onMounted, watch } from "vue";
  import Chart from "primevue/chart";
  
  const spendingData = inject("spendingData");
  
  const chartData = ref();
  const chartOptions = ref();
  const currentMonth = ref("");
  const leftToSpend = ref("$999.99");
  
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
  
  const formattedTotalSpending = computed(() => `$${totalSpending.value.toFixed(2)}`);
  
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
    filteredExpenses.forEach((expense) => {
      cumulativeTotal += expense.amount;
      labels.push(
        new Date(expense.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      );
      data.push(cumulativeTotal);
    });
  
    chartData.value = {
      labels,
      datasets: [
        {
          label: "Cumulative Spending",
          data,
          borderColor: "#0077b6",
          backgroundColor: "rgba(0, 183, 229, 0.2)",
          fill: true,
        },
      ],
    };
  };
  
  const setChartOptions = () => {
    chartOptions.value = {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: "#333",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#333",
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
        },
      },
    };
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
  
  .header {
    display: flex;
    flex-direction: column;
  }
  
  .header h1 {
    font-size: 2rem;
  }

  #currentMonth.header.h4 {
    color: black ;
  }

  .h-chart {
    height: 20rem;
    width: 90%;
  }
  </style>
  