<script setup>
import { provide, onMounted, ref } from 'vue';
import {
  transactionData,
  savingsData,
  checkingData,
  transferData,
  loadCheckingData,
  loadSavingsData,
  loadTransferData,
  loadTransactionData,
} from '../store/ApiConnections';
import Checking from '@/components/AccountPage/Checking.vue';
import Savings from '@/components/AccountPage/Savings.vue';
import TransferTable from '@/components/AccountPage/TransferTable.vue';

const isLoading = ref(true);

// Provide unified data to child components
provide('transactionData', transactionData);
provide('savingsData', savingsData);
provide('checkingData', checkingData);
provide('transferData', transferData);

const refreshData = async () => {
  try {
    await loadTransactionData(); // Load both income and expenses
    await loadCheckingData();
    await loadSavingsData();
    await loadTransferData();
  } catch (error) {
    console.error('Error loading data', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  refreshData();
});
</script>

<template>
  <main>
    <div class="header">
      <div class="header-title">
        <i class="pi pi-wallet header-icon"></i>
        <h1>Account Overview</h1>
      </div>
      <div class="header-buttons">
        <router-link to="/">
          <button class="add-transaction">
            <i style="margin-right: 0.5rem"></i>
            Spending Insights
          </button>
        </router-link>
        <router-link to="/transfer">
          <button class="add-transaction">
            <i class="pi pi-arrow-right-arrow-left" style="margin-right: 0.5rem"></i>
            Transfer Funds
          </button>
        </router-link>
      </div>
    </div>

    <div class="contents">
      <div class="accounts">
        <Checking />
        <Savings />
      </div>
      <TransferTable />
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
  min-width: 72rem;
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

.contents {
  display: flex;
  flex-direction: column;
}

.accounts {
  display: flex;
  gap: 1rem;
}
</style>
