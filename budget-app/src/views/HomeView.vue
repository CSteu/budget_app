<script setup>
import { provide } from 'vue';
import { spendingData } from '../store/SpendingData';

import ExpenseTracker from '../components/ExpenseTracker.vue';
import IncomeExpenseBarChart from '@/components/IncomeExpenseBarChart.vue';
import SpendingLineChart from '@/components/SpendingLineChart.vue';
import SpendingCategories from '@/components/SpendingCategories.vue';

provide('spendingData', spendingData);
</script>

<template>
  <main>
    <router-link to="/add-spending">
      <Button
        label="Add New Spending"
        icon="pi pi-plus"
        style="background-color: rgb(0, 162, 199); border: none; color: white; font-weight: bold; border-radius: 8px; padding: 0.7rem 1.5rem;"
      />
    </router-link>

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
</style>

