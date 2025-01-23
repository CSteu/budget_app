<template>
    <div class="form-container">
      <div class="form-header">
        <button class="back-button" @click="goBack">Return</button>
        <h1 class="form-title">Transfer Funds</h1>
      </div>
  
      <p class="form-description">
        Transfer funds from one account to another. Please ensure you have sufficient funds in the source account.
      </p>
  
      <form @submit.prevent="handleSubmit" class="form-content">
        <div class="form-group">
          <label for="fromAccount" class="form-label">From Account</label>
          <select v-model="fromAccountId" id="fromAccount" class="form-input">
            <option v-for="account in accounts" :key="account.id" :value="account.id">
              {{ account.name }} ({{ formatCurrency(account.currentBalance) }})
            </option>
          </select>
        </div>
  
        <div class="form-group">
          <label for="toAccount" class="form-label">To Account</label>
          <select v-model="toAccountId" id="toAccount" class="form-input">
            <option v-for="account in filteredAccounts" :key="account.id" :value="account.id">
              {{ account.name }} ({{ formatCurrency(account.currentBalance) }})
            </option>
          </select>
        </div>
  
        <div class="form-group">
          <label for="amount" class="form-label">Transfer Amount</label>
          <input 
            type="number" 
            id="amount" 
            v-model.number="amount" 
            class="form-input" 
            min="0" 
            :max="maxTransferAmount" 
            placeholder="Enter amount to transfer"
          />
          <span v-if="amount > maxTransferAmount" class="error-message">
            Transfer amount exceeds available balance.
          </span>
        </div>
  
        <button type="submit" class="submit-button" :disabled="!isFormValid">
          Transfer
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
import { date } from 'zod';
  
  const accounts = ref([]);
  const fromAccountId = ref(null);
  const toAccountId = ref(null);
  const amount = ref(0);
  const router = useRouter();
  
  const fetchAccounts = async () => {
    try {
      const response = await axios.get('https://localhost:5001/api/Accounts');
      accounts.value = response.data;
    } catch (error) {
      console.error('Failed to fetch accounts:', error);
    }
  };
  
  onMounted(fetchAccounts);
  
  const filteredAccounts = computed(() => {
    return accounts.value.filter(account => account.id !== fromAccountId.value);
  });
  
  const maxTransferAmount = computed(() => {
    const fromAccount = accounts.value.find(account => account.id === fromAccountId.value);
    return fromAccount ? fromAccount.currentBalance : 0;
  });
  
  const isFormValid = computed(() => {
    return fromAccountId.value && toAccountId.value && amount.value > 0 && amount.value <= maxTransferAmount.value;
  });
  
  const handleSubmit = async () => {
    if (isFormValid.value) {
      try {
        const transferData = {
          amount: amount.value,
          sendingAccountId: fromAccountId.value,
          recievingAccountId: toAccountId.value,
          date: new Date()
        };
  
        await axios.post('https://localhost:5001/api/Transfers', transferData);
  
        await updateAccountBalance(fromAccountId.value, -amount.value);
  
        await updateAccountBalance(toAccountId.value, amount.value);
  
        router.push('/accounts');
      } catch (error) {
        console.error('Failed to complete the transfer:', error);
        alert('Failed to complete the transfer. Please try again.');
      }
    } else {
      alert('Please fill out all fields correctly.');
    }
  };
  
  const updateAccountBalance = async (accountId, changeAmount) => {
    try {
      const account = accounts.value.find(account => account.id === accountId);
      if (!account) throw new Error('Account not found');
  
      const updatedBalance = account.currentBalance + changeAmount;
  
      await axios.put(`https://localhost:5001/api/Accounts/${accountId}`, {
        Name: "test",
        currentBalance: updatedBalance
      });
    } catch (error) {
      console.error(`Failed to update balance for account ${accountId}:`, error);
    }
  };
  
  const goBack = () => {
    router.push('/accounts');
  };
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };
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
  
  .back-button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;
  }
  
  .back-button:hover {
    background-color: #0056b3;
  }
  
  .form-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--vt-c-text-dark-2);
  }
  
  .form-description {
    font-size: 1rem;
    color: #555;
    margin-bottom: 1.5rem;
  }
  
  .form-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
  }
  
  .form-label {
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  
  .form-input {
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border: 1px solid #d1d5db;
    border-radius: 8px;
  }
  
  .form-input:focus {
    outline: none;
    border-color: #007bff;
  }
  
  .submit-button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .submit-button:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
  
  .submit-button:hover:not(:disabled) {
    background-color: #0056b3;
  }
  
  .error-message {
    color: #e74c3c;
    font-size: 0.875rem;
    margin-top: 0.5rem;
  }
  </style>
  