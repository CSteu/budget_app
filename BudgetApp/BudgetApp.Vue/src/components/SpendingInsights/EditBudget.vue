<template>
    <div class="edit-budget-page">
      <button class="back-button pi pi-arrow-left" @click="goBack"> Cancel</button>
      <div class="header">
        <h1>Edit Your Monthly Spending Target</h1>
      </div>

      <p class="instructions">
        Enter your monthly post-tax income and set a spending target. You can change either of the numbers at any time.
      </p>

      <form @submit.prevent="saveBudget" class="form">
        <div class="form-field">
          <label for="monthly-income">Enter Your Monthly Income</label>
          <InputNumber
            id="monthly-income"
            v-model="monthlyIncome"
            mode="currency"
            currency="USD"
            locale="en-US"
            required
            style="background-color: white; color: black; border: 1px solid rgb(0, 162, 199); border-radius: 8px; padding: 0.5rem; width: 100%;"
          />
          <small class="field-info">Monthly income</small>
        </div>

        <div class="form-field">
          <label for="spending-target">Set a Spending Target</label>
          <InputNumber
            id="spending-target"
            v-model="spendingTarget"
            mode="currency"
            currency="USD"
            locale="en-US"
            required
            style="background-color: white; color: black; border: 1px solid rgb(0, 162, 199); border-radius: 8px; padding: 0.5rem; width: 100%;"
          />
          <small class="field-info">
            Based on your monthly income, we recommend a spending target of
            <strong>${{ recommendedTarget }}</strong>.
          </small>
        </div>

        <p class="summary">
          With this target, you’ll save
          <strong>{{ savingsPercentage }}%</strong> of your income.
        </p>

        <div class="form-actions">
          <button type="button" class="delete-button" @click="deleteBudget">Delete</button>
          <button type="submit" class="submit-button">Save</button>
        </div>
      </form>
    </div>
  </template>

  <script setup>
  import { ref, computed } from "vue";
  import InputNumber from "primevue/inputnumber";
  import { useRouter } from "vue-router";

  const router = useRouter();

  const monthlyIncome = ref(parseFloat(localStorage.getItem("monthlyIncome")) || 5000); // Default income
  const spendingTarget = ref(parseFloat(localStorage.getItem("spendingTarget")) || 1000); // Default target

  const recommendedTarget = computed(() => (monthlyIncome.value * 0.9).toFixed(2));
  const savingsPercentage = computed(() =>
    ((1 - spendingTarget.value / monthlyIncome.value) * 100).toFixed(0)
  );

  const saveBudget = () => {
    localStorage.setItem("monthlyIncome", monthlyIncome.value);
    localStorage.setItem("targetSpending", spendingTarget.value);
    router.push("/");
  };

  const deleteBudget = () => {
    localStorage.removeItem("monthlyIncome");
    localStorage.removeItem("spendingTarget");
    monthlyIncome.value = 0;
    spendingTarget.value = 0;
  };

  const goBack = () => {
    router.push("/");
  };
  </script>

  <style scoped>
  .edit-budget-page {
    padding: 3rem;
    max-width: 600px;
    margin: 0 auto;
    background-color: white;
    border-radius: 1rem;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: center;
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
    color: rgb(90, 90, 90);
    font-size: 1.5rem;
    font-weight: 700;
    cursor: pointer;
    margin-bottom: 1rem;
  }

  .back-button:hover {
    color: rgb(64, 64, 64);
  }

  .instructions {
    font-size: 1rem;
    color: #666;
    margin-bottom: 1rem;
  }

  .form-field {
    margin-bottom: 1rem;
  }

  .field-info {
    display: block;
    font-size: 0.8rem;
    color: #666;
    margin-top: 0.5rem;
  }

  .summary {
    font-size: 1rem;
    color: #444;
    margin: 1rem 0;
  }

  .form-actions {
    display: flex;
    justify-content: space-between;
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

  .delete-button {
    background-color: #e63946;
    border: none;
    color: white;
    font-weight: bold;
    border-radius: 8px;
    padding: 0.7rem 1.5rem;
    cursor: pointer;
  }

  .delete-button:hover {
    background-color: #b71c1c;
  }
  </style>
