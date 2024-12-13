<template>
  <form @submit.prevent="addNewIncome" class="form">
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
        placeholder="Enter a brief description (e.g., Salary, Freelance Work)"
      />
      <small class="field-info">Provide a brief description of the transaction.</small>
    </div>

    <div class="form-field">
      <label for="category">Category</label>
      <input
        id="category"
        v-model="transaction.category"
        readonly
        class="input-field input-disabled"
      />
      <small class="field-info">This field is fixed as "Income".</small>
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
      <small class="field-info">Enter the amount of income for this transaction.</small>
    </div>

    <div class="form-actions">
      <button type="submit" class="submit-button">Add</button>
    </div>
  </form>
</template>

<script setup>
import { ref, defineEmits, onMounted } from "vue";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import axios from "axios";

const emits = defineEmits(["submitted"]);

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const transaction = ref({
  date: getTodayDate(),
  description: "",
  amount: null,
  category: "Income",
});


const addNewIncome = async () => {
  try {
    const response = await axios.post(`https://localhost:5001/api/transactions`, {
      description: transaction.value.description,
      amount: transaction.value.amount,
      date: transaction.value.date,
      category: transaction.value.category,
      isIncome: true
    });
    if (response.status === 201) {
      resetForm();
      emits("submitted");
    } else {
      console.error("Failed to add income transaction", response);
    }
  } catch (error) {
    console.error("Error adding income transaction:", error);
  }
};

const resetForm = () => {
  transaction.value = {
    date: getTodayDate(),
    description: "",
    amount: null,
    category: "Income",
  };
};

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

.input-disabled {
  background-color: #e0e0e0;
  color: #666;
  font-size: 1.2rem;
  cursor: not-allowed;
  padding: 0.5rem;
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
</style>
