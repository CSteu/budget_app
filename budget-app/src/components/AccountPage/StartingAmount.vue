<template>
    <div class="form-container">
        <div class="form-header">
            <button class="back-button" @click="goBack">Return</button>
            <h1 class="form-title">Starting Amount</h1>
        </div>

        <p class="form-description">
            Add in the starting amounts for both your Checking Account as well as your Savings Account.
        </p>

        <div class="toggle-switch">
            <span class="toggle-label">Checking</span>
            <label class="switch">
                <input type="checkbox" v-model="isChecking" />
                <span class="slider"></span>
            </label>
            <span class="toggle-label">Savings</span>
        </div>

        <div class="form-content">
            <CheckingForm v-if="!isChecking" @submitted="handleCheckingSubmit" />
            <SavingsForm v-else @submitted="handleSavingsSubmit" />
        </div>
    </div>
</template>


<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import CheckingForm from "./CheckingForm.vue";
import SavingsForm from "./SavingsForm.vue";

const router = useRouter();
const isChecking = ref(false);

const handleCheckingSubmit = () => {
    router.push("/accounts");
};

const handleSavingsSubmit = () => {
    router.push("/accounts");
};

const goBack = () => {
    router.push("/accounts");
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

.account-toggle {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5rem;
}

.toggle-label {
    display: flex;
    align-items: center;
    font-size: 1rem;
    color: var(--vt-c-text-dark-2);
}

.toggle-label input[type="checkbox"] {
    margin-right: 0.5rem;
    cursor: pointer;
}

.form-content {
    margin-top: 1rem;
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
