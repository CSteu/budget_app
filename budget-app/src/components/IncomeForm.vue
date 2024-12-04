<template>
  <form @submit.prevent="addNewIncome" class="form">
    <div class="form-field">
      <label for="date">Date</label>
      <input
        id="date"
        type="date"
        v-model="transaction.date"
        required
        style="background-color: white; color: black; border: 1px solid rgb(0, 162, 199); border-radius: 8px; padding: 0.5rem; width: 100%;"
      />
    </div>

    <div class="form-field">
      <label for="description">Description</label>
      <InputText
        id="description"
        v-model="transaction.description"
        required
        style="background-color: white; color: black; border: 1px solid rgb(0, 162, 199); border-radius: 8px; padding: 0.5rem; width: 100%;"
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
        style="background-color: white; color: black; border: 1px solid rgb(0, 162, 199); border-radius: 8px; padding: 0.5rem; width: 100%;"
      />
    </div>

    <div class="form-actions">
      <button type="submit" class="submit-button">Add</button>
    </div>
  </form>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";

const emits = defineEmits(["submitted"]);

const transaction = ref({
  date: null,
  description: "",
  amount: null,
  category: "Income", // Automatically set to "Income"
});

const addNewIncome = () => {
  const incomeData = JSON.parse(localStorage.getItem("incomeData") || "[]");
  incomeData.push({ ...transaction.value });
  localStorage.setItem("incomeData", JSON.stringify(incomeData));
  resetForm();
  emits("submitted");
};

const resetForm = () => {
  transaction.value = {
    date: null,
    description: "",
    amount: null,
    category: "Income",
  };
};
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
