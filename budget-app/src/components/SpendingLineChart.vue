<template>
    <div class="card">
      <div class="header">
        <h4>{{ currentMonth }} Spending</h4>
        <h1>{{ formattedTotalSpending }}</h1>
      </div>
      <Chart type="line" :data="chartData" :options="chartOptions" class="h-chart" />
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from "vue";
  import Chart from "primevue/chart";
  
  const chartData = ref();
  const chartOptions = ref();
  
  const expenses = ref([
    { date: "2024-11-19", description: "Groceries", category: "Food", amount: 45.67 },
    { date: "2024-11-18", description: "Gas", category: "Transport", amount: 25.34 },
    { date: "2024-11-17", description: "Movie Night", category: "Entertainment", amount: 15.0 },
    { date: "2024-11-16", description: "Coffee", category: "Food", amount: 5.25 },
    { date: "2024-11-15", description: "Lunch", category: "Food", amount: 10.5 },
    { date: "2024-11-14", description: "Gym", category: "Health", amount: 20.0 },
  ]);
  
  const currentMonth = ref("");
  
  const totalSpending = computed(() => {
    const currentDate = new Date();
    const currentMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const nextMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
  
    return expenses.value
      .filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= currentMonthStart && expenseDate < nextMonthStart;
      })
      .reduce((total, expense) => total + expense.amount, 0);
  });
  
  const formattedTotalSpending = computed(() => `$${totalSpending.value.toFixed(2)}`);
  
  const calculateDailySpending = () => {
    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    const dailySpending = Array.from({ length: daysInMonth }, () => 0);
  
    expenses.value.forEach((expense) => {
      const day = new Date(expense.date).getDate();
      dailySpending[day - 1] += expense.amount;
    });
  
    return dailySpending.reduce((cumulative, current, index) => {
      cumulative.push((cumulative[index - 1] || 0) + current);
      return cumulative;
    }, []);
  };
  
  const setCurrentMonth = () => {
    const today = new Date();
    currentMonth.value = today.toLocaleString("default", { month: "long" });
  };
  
  const setChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const dailySpending = calculateDailySpending();
  
    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    const labels = Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(new Date().getFullYear(), new Date().getMonth(), i + 1);
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    });
  
    return {
      labels,
      datasets: [
        {
          label: "Cumulative Spending",
          data: dailySpending,
          borderColor: documentStyle.getPropertyValue("--p-blue-500"),
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          fill: true,
        },
      ],
    };
  };
  
  const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--p-text-color");
    const surfaceBorder = documentStyle.getPropertyValue("--p-content-border-color");
  
    return {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColor,
            callback: function (value, index) {
              return index % 2 === 0 ? this.getLabelForValue(value) : ""; // Show every other label
            },
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColor,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };
  };
  
  const updateChart = () => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
  };
  
  onMounted(() => {
    updateChart();
    setCurrentMonth();
  });
  </script>
  
  <style>
  .card {
    width: 100%;
    margin: 2rem auto;
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
    color: #333;
  }
  
  .header h4 {
    color: #333;
  }
  
  .h-chart {
    height: 20rem;
    width: 90%;
  }
  </style>
  