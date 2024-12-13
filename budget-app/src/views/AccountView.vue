<script setup>
import { provide, onMounted } from 'vue'
import { spendingData, incomeData, loadIncomeData, loadSpendingData } from '../store/TransactionData';
import Checking from '@/components/Checking.vue';

provide('spendingData', spendingData)
provide('incomeData', incomeData)

const refreshData = async () => {
  await loadSpendingData();
  await loadIncomeData();

  console.log(incomeData);
};

onMounted(() => {
  refreshData();
});

</script>

<template>
    <Checking />
</template>
