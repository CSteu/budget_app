<template>
    <form class="form-container" @submit.prevent="updateSavingsAccount">
      <div class="form-header">
        <h1 class="form-title">Update Savings Account</h1>
      </div>
  
      <div class="form-content">
        <label for="starting-balance" class="form-label">Starting Balance</label>
        <InputNumber
          id="starting-balance"
          v-model="account.StartingBalance"
          mode="currency"
          currency="USD"
          locale="en-US"
          required
          class="input-field"
        />
        <small class="form-hint">Enter the starting balance for the Savings Account</small>
      </div>
  
      <div class="form-content">
        <label for="current-balance" class="form-label">Current Balance</label>
        <InputNumber
          id="current-balance"
          v-model="account.CurrentBalance"
          mode="currency"
          currency="USD"
          locale="en-US"
          required
          class="input-field"
        />
        <small class="form-hint">Enter the current balance for the Savings Account</small>
      </div>
  
      <div class="form-actions">
        <button type="submit" class="submit-button">Update</button>
      </div>
    </form>
  </template>
  
  <script setup>
  import { ref, defineEmits, onMounted } from 'vue'
  import InputText from 'primevue/inputtext'
  import InputNumber from 'primevue/inputnumber'
  import axios from 'axios'
  
  const emits = defineEmits(['submitted'])
  
  const account = ref({
    Id: 1,
    StartingBalance: null,
    CurrentBalance: null,
    isChecking: true,
  })
  
  const updateSavingsAccount = async () => {
    try {
      const response = await axios.put(`https://localhost:5001/api/accounts/2`, {
        StartingBalance: account.value.StartingBalance,
        CurrentBalance: account.value.CurrentBalance,
        isChecking: false,
      })
      if (response.status === 204) {
        resetForm()
        emits('submitted')
      } else {
        console.error('Failed to update Savings account:', response)
      }
    } catch (error) {
      console.error('Error updating Savings account:', error)
    }
  }
  
  const resetForm = () => {
    account.value = {
      Id: 1,
      StartingBalance: null,
      CurrentBalance: null,
      isChecking: true,
    }
  }
  </script>
  
  <style scoped>
  .form-container {
    width: 100%;
    max-width: 600px;
    margin: 2rem auto;
    padding: 2rem;
    background-color: #ffffff;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
  
  .form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .form-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--vt-c-text-dark-2);
  }
  
  .form-content {
    margin-bottom: 1.5rem;
  }
  
  .form-label {
    display: block;
    font-size: 1rem;
    font-weight: bold;
    color: var(--vt-c-text-dark-2);
    margin-bottom: 0.5rem;
  }
  
  .input-field {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #dcdcdc;
    border-radius: 8px;
    font-size: 1rem;
  }
  
  .form-hint {
    font-size: 0.875rem;
    color: #555;
    margin-top: 0.25rem;
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
  }
  
  .submit-button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;
  }
  
  .submit-button:hover {
    background-color: #0056b3;
  }
  </style>
  