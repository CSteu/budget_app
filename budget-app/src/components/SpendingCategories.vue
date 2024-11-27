<template>
    <div class="top-categories">
      <h2>Top 5 Categories</h2>
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
            <h3>${{ category.totalSpent.toFixed(2) }}</h3>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { inject, reactive, watch, onMounted } from 'vue';
  import Chart from 'primevue/chart';
  
  const predefinedBlueShades = [
    '#03045e', 
    '#023e8a',
    '#0077b6',
    '#0096c7',
    '#00b4d8', 
  ];
  
  const spendingData = inject('spendingData');
  
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
    },
  });
  
  const calculateTopCategories = () => {
    const categoryStats = spendingData.expenses.reduce((acc, expense) => {
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
  
    // Add styles for the dots in the table
    topCategories.forEach((cat, index) => {
      cat.style = `background-color: ${predefinedBlueShades[index] || '#ccc'};`;
    });
  
    state.topCategories = topCategories;
  
    updateChart();
  };
  
  const updateChart = () => {
    chartData.labels = state.topCategories.map((cat) => cat.category);
    chartData.datasets[0].data = state.topCategories.map((cat) => cat.totalSpent);
    chartData.datasets[0].backgroundColor = predefinedBlueShades.slice(0, state.topCategories.length);
  };
  
  watch(
    () => spendingData.expenses,
    () => {
      calculateTopCategories();
    },
    { deep: true }
  );
  
  onMounted(() => {
    calculateTopCategories();
  });
  </script>
  
  <style>
  .top-categories {
    max-width: 600px;
    margin: 2rem auto;
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
    font-size: .8rem;
    font-weight: 400;
    color: #555;
    text-align: center;
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
  