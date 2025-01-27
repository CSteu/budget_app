<script setup>
import CSVUploadAndPreview from '@/components/ImportTransactions/CSVUploadAndPreview.vue';
import { provide, onMounted } from 'vue';
import { transactionData, refreshData } from '../store/ApiConnections';

import { instrumentMyComponentMethod } from '../telemetry/telemetry';

provide('transactionData', transactionData);

onMounted(() => {
  refreshData();
});
</script>

<template>
  <main>
    <div class="header">
      <div class="header-title">
        <i class="pi pi-upload header-icon"></i>
        <h1>Import Transactions</h1>
      </div>
      <div class="header-buttons">
        <button class="add-transaction" @click="handleClick">
          <i class="pi pi-plus" style="margin-right: 0.5rem"></i>
          Click Me
        </button>
      </div>
    </div>

    <div class="wrapper">
      <CSVUploadAndPreview />
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
  position: fixed; /* Make the header fixed */
  top: 0; /* Position it at the top */
  left: 0; /* Align to the left */
  right: 0; /* Align to the right */
  height: var(--header-height); /* Set a fixed height */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 3rem; /* Horizontal padding */
  background: linear-gradient(
    90deg,
    #03045e,
    #023e8a,
    #0077b6,
    #0096c7,
    #00b4d8
  );
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* Ensure the header is above other content */
  width: 100%; /* Full width */
  box-sizing: border-box; /* Include padding in width and height */
  border-radius: 0 0 16px 16px;
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
  align-items: center; /* Ensure buttons are vertically centered */
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
  padding: 1rem; /* Optional: Add padding as needed */
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
