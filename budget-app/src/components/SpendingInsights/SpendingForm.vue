<template>
  <form @submit.prevent="addNewSpending" class="form">
    <div class="form-field">
      <label for="date">Date</label>
      <input
        id="date"
        type="date"
        v-model="transaction.date"
        required
        class="input-field"
      />
      <small class="field-info">Select the date of the transaction.</small>
    </div>

    <div class="form-field">
      <label for="description">Description</label>
      <InputText
        id="description"
        v-model="transaction.description"
        required
        class="input-field"
        placeholder="Enter a brief description (e.g., Groceries, Taxi Ride)"
      />
      <small class="field-info">Provide a brief description of the transaction.</small>
    </div>

    <div class="form-field">
      <label for="category">Category</label>
      <Dropdown
        id="category"
        v-model="transaction.category"
        :options="categories"
        optionLabel="name"
        optionValue="value"
        placeholder="Select a Category"
        required
        class="input-field"
        panelClass="dropdown-panel"
        panelStyle="background-color: white; color: black;"
      />
      <small class="field-info">Choose the category that best describes this transaction.</small>
    </div>

    <div class="form-field">
      <label for="amount">Amount</label>
      <InputNumber
        id="amount"
        v-model="transaction.amount"
        mode="currency"
        currency="USD"
        locale="en-US"
        required
        class="input-field"
      />
      <small class="field-info">Enter the amount of the spending transaction.</small>
    </div>

    <div class="form-actions">
      <button type="submit" class="submit-button">Add</button>
    </div>
  </form>
</template>

<script setup>
import { ref, defineEmits, onMounted } from 'vue'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import InputNumber from 'primevue/inputnumber'
import axios from 'axios'

const emits = defineEmits(['submitted'])

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const transaction = ref({
  date: getTodayDate(),
  description: '',
  category: null,
  amount: null,
})

const categories = [
  { name: 'Food', value: 'Food' },
  { name: 'Transport', value: 'Transport' },
  { name: 'Entertainment', value: 'Entertainment' },
  { name: 'Health', value: 'Health' },
  { name: 'Bills', value: 'Bills' },
  { name: 'Groceries', value: 'Groceries' },
  { name: 'Shopping', value: 'Shopping' },
  { name: 'Subscriptions', value: 'Subscriptions' },
  { name: 'Dining', value: 'Dining' },
  { name: 'Education', value: 'Education' },
  { name: 'Other', value: 'Other' }
]

const addNewSpending = async () => {
  try {
    const response = await axios.post(`https://localhost:5001/api/transactions`, { ...transaction.value })
    if (response.status === 201) {
      resetForm()
      emits('submitted')
    } else {
      console.error('Failed to add transaction', response)
    }
  } catch (error) {
    console.error('Error adding transaction:', error)
  }
}

const resetForm = () => {
  transaction.value = {
    date: getTodayDate(),
    description: '',
    category: null,
    amount: null,
  }
}

onMounted(() => {
  transaction.value.date = getTodayDate();
});
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-field {
  display: flex;
  flex-direction: column;
}

.form-field label {
  font-size: 1rem;
  font-weight: bold;
  color: rgb(0, 162, 199);
  margin-bottom: 0.5rem;
}

.input-field {
  background-color: white;
  color: black;
  border: 1px solid rgb(0, 162, 199);
  border-radius: 8px;
  padding: 0.5rem;
  width: 100%;
}

.field-info {
  display: block;
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.5rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
}

.submit-button {
  background-color: rgb(0, 162, 199);
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  padding: 0.7rem 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #023e8a;
}

.p-select-option {
  background-color: white ;
  color: black;
}
</style>
