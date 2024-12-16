<script setup>
import { provide, onMounted, ref } from 'vue'
import {
  spendingData,
  incomeData,
  savingsData,
  checkingData,
  loadIncomeData,
  loadSpendingData,
  loadCheckingData,
  loadSavingsData,
} from '../store/TransactionData'
import Checking from '@/components/AccountPage/Checking.vue'
import Savings from '@/components/AccountPage/Savings.vue'

const isLoading = ref(true)

provide('spendingData', spendingData)
provide('incomeData', incomeData)
provide('savingsData', savingsData)
provide('checkingData', checkingData)

const refreshData = async () => {
  try {
    await loadSpendingData()
    await loadIncomeData()
    await loadCheckingData()
    await loadSavingsData()
    console.log(checkingData)
  } catch (error) {
    console.error('Error loading data', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  refreshData()
})
</script>

<template>
  <main>
    <div class="header">
      <div class="header-title">
        <i class="pi pi-wallet header-icon"></i>
        <h1>Account Overview</h1>
      </div>
      <router-link to="/starting-value">
        <button class="add-transaction">
          <i class="pi pi-plus" style="margin-right: 0.5rem"></i>
          Add Starting Values
        </button>
      </router-link>
    </div>

    <div class="content">
      <Checking />
      <Savings />
    </div>
  </main>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: linear-gradient(90deg, #03045e, #023e8a, #0077b6, #0096c7, #00b4d8);
  border-radius: 0 0 16px 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
  backdrop-filter: blur(5px);
}

.add-transaction:hover {
  background-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.add-transaction:active {
  transform: translateY(0);
  box-shadow: none;
}

.content {
  padding: 2rem;
}

</style>
