<template>
    <div>
        <div>
        <button @click="goBack">Return</button>
        </div>
        <div>
        <h1>Starting Amount</h1>
        </div>

        <p>
        Add in the starting amounts for both your Checking Account as well as your Savings Account
        </p>

        <div>
        <span>Checking</span>
        <label>
            <input type="checkbox" v-model="isChecking" />
        </label>
        <span>Savings</span>
        </div>

        <div>
            <CheckingForm v-if="isChecking" @submitted="handleCheckingSubmit" />
            <SavingsForm v-else @submitted="handleSavingsSubmit" />
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import CheckingForm from "./CheckingForm.vue";
import SavingsForm from "./SavingsForm.vue"

const router = useRouter();
const isChecking = ref(true);

const handleCheckingSubmit = () => {
router.push("/");
};

const handleSavingsSubmit = () => {
router.push("/");
};

const goBack = () => {
router.push("/");
};
</script>