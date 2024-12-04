<template>
  <div class="add-transaction-page">
    <div class="header">
      <button class="back-button" @click="goBack">← Back</button>
      <h1>Add Transaction</h1>
    </div>

    <div class="toggle-switch">
      <label class="switch">
        <input type="checkbox" v-model="isSpending" />
        <span class="slider"></span>
      </label>
      <span class="toggle-label">{{ isSpending ? "Spending" : "Income" }}</span>
    </div>

    <div>
      <SpendingForm v-if="isSpending" @submitted="handleSpendingSubmit" />
      <IncomeForm v-else @submitted="handleIncomeSubmit" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import SpendingForm from "./SpendingForm.vue";
import IncomeForm from "./IncomeForm.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isSpending = ref(true);

const handleSpendingSubmit = () => {
  router.push("/");
};

const handleIncomeSubmit = () => {
  router.push("/");
};

const goBack = () => {
  router.push("/");
};
</script>

<style scoped>
.add-transaction-page {
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

.toggle-switch {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  justify-content: center;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(0, 162, 199);
  transition: 0.4s;
  border-radius: 30px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 24px;
  width: 24px;
  left: 4px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: rgb(0, 162, 199);
}

input:checked + .slider:before {
  transform: translateX(30px);
}

.toggle-label {
  font-size: 1rem;
  font-weight: bold;
  color: rgb(0, 162, 199);
}
</style>
