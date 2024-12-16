<script setup>
import { provide, onMounted } from 'vue'
import { spendingData, incomeData, savingsData, checkingData, loadIncomeData, loadSpendingData, loadCheckingData, loadSavingsData } from '../store/TransactionData';
import Checking from '@/components/Checking.vue';
import Savings from '@/components/Savings.vue'


provide('spendingData', spendingData)
provide('incomeData', incomeData)
provide('savingsData', savingsData)
provide('checkingData', checkingData)

const refreshData = async () => {
  await loadSpendingData();
  await loadIncomeData();
  await loadCheckingData();
  await loadSavingsData();

  console.log(incomeData);
};

onMounted(() => {
  refreshData();
});

</script>

<template>
  <div>
    <router-link to="/starting-value">
      <button>
        Add Starting Values
      </button>
    </router-link>
  </div>
    <Checking />
    <Savings />
</template>
