<template>
    <form @submit.prevent="SavingsAmount">
        <div>
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
        <small>Enter the amount for the Savings Account</small>
        </div>

        <div class="form-actions">
        <button type="submit">Add</button>
        </div>
    </form>
</template>

<script setup>
    import { ref, defineEmits, onMounted } from "vue";
    import InputText from "primevue/inputtext";
    import InputNumber from "primevue/inputnumber";
    import axios from "axios";

    const emits = defineEmits(["submitted"]);

    const transaction = ref({
    description: "",
    amount: null,
    category: "Savings",
    });


    const addSavings = async () => {
    try {
        const response = await axios.post(`https://localhost:5001/api/accounts`, {
        amount: account.value.amount,
        isIncome: true
        });
        if (response.status === 201) {
        resetForm();
        emits("submitted");
        } else {
        console.error("Failed to add savings amount:", response);
        }
    } catch (error) {
        console.error("Error adding savings amount:", error);
    }
    };

    const resetForm = () => {
    transaction.value = {
        description: "",
        amount: null,
        category: "Savings",
    };
    };
</script>