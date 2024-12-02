<template>
  <div class="add-spending-page">
    <div class="header">
      <button class="back-button" @click="goBack">← Back</button>
      <h1>Add New Spending</h1>
    </div>

    <form @submit.prevent="addNewSpending" class="form">
      <div class="form-field">
        <label for="date">Date</label>
        <input
          id="date"
          type="date"
          v-model="newSpending.date"
          required
          style="background-color: white; color: black; border: 1px solid rgb(0, 162, 199); border-radius: 8px; padding: 0.5rem; width: 100%;"
        />
      </div>

      <div class="form-field">
        <label for="description">Description</label>
        <InputText
          id="description"
          v-model="newSpending.description"
          required
          style="background-color: white; color: black; border: 1px solid rgb(0, 162, 199); border-radius: 8px; padding: 0.5rem; width: 100%;"
        />
      </div>

      <div class="form-field">
        <label for="category">Category</label>
        <Dropdown
          id="category"
          v-model="newSpending.category"
          :options="categories"
          optionLabel="name"
          optionValue="value"
          placeholder="Select a Category"
          required
          style="background-color: white; color: black; border: 1px solid rgb(0, 162, 199); border-radius: 8px; padding: 0.5rem; width: 100%;"
          panelStyle="background-color: white; color: black;"
        />
      </div>

      <div class="form-field">
        <label for="amount">Amount</label>
        <InputNumber
          id="amount"
          v-model="newSpending.amount"
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
  </div>
</template>

<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import InputNumber from "primevue/inputnumber";
import { useRouter } from "vue-router";
import { spendingData } from "../store/SpendingData";

const router = useRouter();

const newSpending = ref({
  date: null,
  description: "",
  category: null,
  amount: null,
});

const categories = [
  { name: "Food", value: "Food" },
  { name: "Transport", value: "Transport" },
  { name: "Entertainment", value: "Entertainment" },
  { name: "Housing", value: "Housing" },
  { name: "Utilities", value: "Utilities" },
  { name: "Health", value: "Health" },
  { name: "Education", value: "Education" },
  { name: "Shopping", value: "Shopping" },
];

const addNewSpending = () => {
  spendingData.expenses.push({
    date: formatDate(newSpending.value.date),
    description: newSpending.value.description,
    category: newSpending.value.category,
    amount: newSpending.value.amount,
  });

  localStorage.setItem("spendingData", JSON.stringify(spendingData.expenses));
  resetForm();
  router.push("/");
};

const resetForm = () => {
  newSpending.value = {
    date: null,
    description: "",
    category: null,
    amount: null,
  };
};

const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const year = d.getFullYear();
  const month = (`0${d.getMonth() + 1}`).slice(-2);
  const day = (`0${d.getDate()}`).slice(-2);
  return `${year}-${month}-${day}`;
};

const goBack = () => {
  router.push("/");
};
</script>

<style scoped>
.add-spending-page {
  padding: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.header h1 {
  font-size: 1.5rem;
  color: rgb(0, 162, 199);
}

.back-button {
  background: none;
  border: none;
  color: rgb(0, 162, 199);
  font-size: 1.2rem;
  cursor: pointer;
}

.back-button:hover {
  text-decoration: underline;
}

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
