<script setup>

import CSVUploadAndPreview from '@/components/ImportTransactions/CSVUploadAndPreview.vue'

</script>

<template>
  <main>
    <div class="header">
      <div class="header-title">
        <i class="pi pi-chart-line header-icon"></i>
        <h1>Import Transactions</h1>
      </div>
    </div>
    <div class="wrapper">
      <CSVUploadAndPreview/>
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
  transition:
    background-color 0.3s ease,
    transform 0.2s ease,
    box-shadow 0.3s ease;
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

.wrapper {
  display: flex;
  width: 75vw;
  justify-content: center;
}

</style>
