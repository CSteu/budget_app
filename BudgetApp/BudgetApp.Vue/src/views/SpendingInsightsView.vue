<script setup>
import { provide, onMounted } from 'vue';
import { transactionData, refreshData } from '../store/ApiConnections';

import ExpenseTracker from '../components/SpendingInsights/TransactionTable.vue';
import IncomeExpenseBarChart from '@/components/SpendingInsights/IncomeExpenseBarChart.vue';
import SpendingLineChart from '@/components/SpendingInsights/SpendingLineChart.vue';
import SpendingCategories from '@/components/SpendingInsights/SpendingCategories.vue';
import RecurrentSpending from '@/components/SpendingInsights/RecurrentSpending.vue';
import KanyeRest from '@/components/SpendingInsights/KanyeRest.vue';

import { instrumentMyComponentMethod } from '../telemetry/telemetry';

provide('transactionData', transactionData);


// Define the asynchronous operation outside the handleClick function
const someAsyncOperation = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: 'Operation successful' });
    }, 1000);
  });
};

// Define the original handleClick method
const originalHandleClick = async () => {
  // Simulate an asynchronous operation that might be making a network request
  try {
    const data = await someAsyncOperation();
    console.log('Data received:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};

// Instrument the handleClick method
const handleClick = instrumentMyComponentMethod(originalHandleClick);
</script>

<template>
  <main>
    <div class="header">
      <div class="header-title">
        <i class="pi pi-chart-line header-icon"></i>
        <h1>Spending Insights</h1>
      </div>
      <div class="header-buttons">
        <router-link to="/import">
          <button class="add-transaction">
            <i class="pi pi-upload" style="margin-right: 0.5rem"></i>
            Import
          </button>
        </router-link>
        <router-link to="/accounts">
          <button class="add-transaction">
            <i style="margin-right: 0.5rem"></i>
            View Accounts
          </button>
        </router-link>
        <router-link to="/add-spending">
          <button class="add-transaction">
            <i class="pi pi-plus" style="margin-right: 0.5rem"></i>
            Add New Transaction
          </button>
        </router-link>
        <button @click="handleClick">Click Me</button>
      </div>
    </div>

    <div class="wrapper">
      <!-- Left Column -->
      <div class="left-column">
        <!-- Include the components you want in the left column -->
        <SpendingLineChart />
        <IncomeExpenseBarChart />
        <ExpenseTracker />
      </div>
      <!-- Right Column -->
      <div class="right-column">
        <SpendingCategories />
        <RecurrentSpending />
        <!-- <KanyeRest /> -->
      </div>
    </div>
  </main>
</template>

<style scoped>
/* Define a CSS variable for header height */
:root {
  --header-height: 80px; /* Adjust this value as needed */
}

main {
  /* Add padding-top to ensure content isn't hidden behind the fixed header */
  padding-top: var(--header-height);
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0; 
  height: var(--header-height); 
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 3rem; 
  background: linear-gradient(
    90deg,
    #03045e,
    #023e8a,
    #0077b6,
    #0096c7,
    #00b4d8
  );
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 100%; 
  box-sizing: border-box; 
}

.header-title {
  display: flex;
  align-items: center;
}

.header-icon {
  font-size: 2rem;
  color: #fff;
  margin-right: 0.5rem;
}

.header h1 {
  font-size: 2rem;
  color: #ffffff;
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 700;
}

.header-buttons {
  display: flex;
  align-items: center;
}

.add-transaction {
  background-color: rgba(255, 255, 255, 0.2);
  border: 2px solid #ffffff;
  color: #ffffff;
  font-weight: bold;
  border-radius: 8px;
  padding: 0.7rem 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: 
    background-color 0.3s ease,
    transform 0.2s ease,
    box-shadow 0.3s ease;
  backdrop-filter: blur(5px);
  margin-right: 0.5rem; /* Space between buttons */
}

.add-transaction:last-child {
  margin-right: 0; /* Remove margin from the last button */
}

.add-transaction:hover {
  background-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.add-transaction:active {
  transform: translateY(0);
  box-shadow: none;
}

.wrapper {
  display: flex;
  padding-top: 5rem;
}

.left-column {
  width: 65%;
  margin-right: 1rem;
}

.right-column {
  width: 35%;
}

/* Responsive Design (Optional) */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    height: var(--header-height);
    padding: 0.5rem 1rem;
  }

  .header-buttons {
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 0.5rem;
  }

  .add-transaction {
    margin: 0.25rem;
  }

  .wrapper {
    flex-direction: column;
  }

  .left-column,
  .right-column {
    width: 100%;
    margin-right: 0;
    margin-bottom: 1rem;
  }
}
</style>
