<template>
  <form @submit.prevent="addNewSpending" class="form">
    <div class="form-field">
      <label for="date">Date</label>
      <input
        id="date"
        type="date"
        v-model="transaction.date"
        required
        style="
          background-color: white;
          color: black;
          border: 1px solid rgb(0, 162, 199);
          border-radius: 8px;
          padding: 0.5rem;
          width: 100%;
        "
      />
    </div>

    <div class="form-field">
      <label for="description">Description</label>
      <InputText
        id="description"
        v-model="transaction.description"
        required
        style="
          background-color: white;
          color: black;
          border: 1px solid rgb(0, 162, 199);
          border-radius: 8px;
          padding: 0.5rem;
          width: 100%;
        "
      />
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
        style="
          background-color: white;
          color: black;
          border: 1px solid rgb(0, 162, 199);
          border-radius: 8px;
          padding: 0.5rem;
          width: 100%;
        "
        panelStyle="background-color: white; color: black;"
      />
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
        style="
          background-color: white;
          color: black;
          border: 1px solid rgb(0, 162, 199);
          border-radius: 8px;
          padding: 0.5rem;
          width: 100%;
        "
      />
    </div>

    <div class="form-actions">
      <button type="submit" class="submit-button">Add</button>
    </div>
  </form>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import InputNumber from 'primevue/inputnumber'
import { spendingData } from '../store/TransactionData'

const emits = defineEmits(['submitted'])

const transaction = ref({
  date: null,
  description: '',
  category: null,
  amount: null,
})

const categories = [
  { name: 'Food', value: 'Food' },
  { name: 'Transport', value: 'Transport' },
  { name: 'Entertainment', value: 'Entertainment' },
]

const addNewSpending = () => {
  spendingData.expenses.push({ ...transaction.value })
  localStorage.setItem('spendingData', JSON.stringify(spendingData.expenses))
  resetForm()
  emits('submitted')
}

const resetForm = () => {
  transaction.value = {
    date: null,
    description: '',
    category: null,
    amount: null,
  }
}
</script>

<style scoped>
.form-field {
  margin-bottom: 1rem;
}

.form-actions {
  text-align: right;
}

.submit-button {
  background-color: rgb(0, 162, 199);
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  padding: 0.7rem 1.5rem;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #023e8a;
}
</style>
