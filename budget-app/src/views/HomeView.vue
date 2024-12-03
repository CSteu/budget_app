<script setup>
import { provide } from 'vue'
import { spendingData } from '../store/SpendingData'

import ExpenseTracker from '../components/ExpenseTracker.vue'
import IncomeExpenseBarChart from '@/components/IncomeExpenseBarChart.vue'
import SpendingLineChart from '@/components/SpendingLineChart.vue'
import SpendingCategories from '@/components/SpendingCategories.vue'

provide('spendingData', spendingData)
</script>

<template>
  <main>
    <div class="header">
      <h1>Spending Insights</h1>
      <router-link to="/add-spending">
        <button
          style="
            background-color: rgb(0, 162, 199);
            border: none;
            color: white;
            font-weight: bold;
            border-radius: 8px;
            padding: 0.7rem 1.5rem;
          "
        >
          <i class="pi pi-plus" style="margin-right: 0.5rem"></i>
          Add New Spending
        </button>
      </router-link>
    </div>

    <div class="wrapper">
      <!-- Left Column -->
      <div class="left-column">
        <!-- Include the components you want in the left column -->
        <SpendingLineChart />
        <ExpenseTracker />
        <IncomeExpenseBarChart />
      </div>
      <!-- Right Column -->
      <div class="right-column">
        <SpendingCategories />
      </div>
    </div>
  </main>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
  margin: auto 1rem;
}

.wrapper {
  display: flex;
  width: 75vw;
}

.left-column {
  width: 65%;
  margin-right: 1rem;
}

.right-column {
  width: 35%;
}

.add-spending-button {
  cursor: pointer;
}
</style>
