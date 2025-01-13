<template>
  <!-- Container -->
  <div class="container">
    <h2 class="header">Budget Details</h2>

    <!-- Test Card to Ensure Card is Rendering -->
    <!-- Remove or comment out after verifying -->
    
    <Card class="test-card">
      <p>This is a test card to verify rendering.</p>
    </Card>
   

    <!-- Categories -->
    <Card
      v-for="category in categories"
      :key="category"
      class="category-card"
    >
      <!-- Category Header -->
      <div class="category-header">
        <h3 class="category-name">{{ category }}</h3>
        <div class="budget-controls">
          <span class="budget-value">Target: ${{ formatNumber(budgets[category] || 0) }}</span>
          <Button
            icon="pi pi-pencil"
            class="edit-button"
            @click="openEditDialog(category)"
            tooltip="Edit Target"
            tooltip-options="{ position: 'top' }"
          />
        </div>
      </div>

      <!-- Progress Bar -->
      <ProgressBar
        :value="getProgressPercentage(category)"
        class="progress-bar"
        :style="{ height: '20px' }"
        :color="isOverBudget(category) ? '#e74c3c' : '#2ecc71'"
      />

      <!-- Spending Info -->
      <div class="spending-info">
        <span>Spent: ${{ formatNumber(totalSpending[category] || 0) }}</span>
        <span :class="isOverBudget(category) ? 'over-budget' : 'under-budget'">
          {{ isOverBudget(category) ? 'Over Budget' : 'Under Budget' }}
        </span>
      </div>

      <!-- Transactions List -->
      <div class="transaction-container">
        <ul class="transaction-list">
          <li
            class="transaction-item"
            v-for="tx in filteredTransactions(category)"
            :key="tx.id"
          >
            <span class="description">{{ tx.description }}</span>
            <span
              class="amount"
              :class="tx.isIncome ? 'income' : 'expense'"
            >
              ${{ formatNumber(tx.amount) }}
            </span>
          </li>
        </ul>
      </div>
    </Card>

    <!-- Edit Budget Dialog -->
    <Dialog
      header="Edit Budget"
      v-model:visible="displayEditDialog"
      modal
      :closable="false"
      class="edit-dialog"
    >
      <div class="dialog-content">
        <span class="dialog-label">Set budget for <strong>{{ currentEditCategory }}</strong>:</span>
        <InputNumber
          v-model="tempBudget"
          mode="currency"
          currency="USD"
          locale="en-US"
          class="input-number"
          :min="0"
          :max="1000000"
        />
      </div>
      <template #footer>
        <div class="dialog-footer">
          <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="cancelEdit" />
          <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveBudget" />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { inject, ref, watch, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import ProgressBar from 'primevue/progressbar';
import InputNumber from 'primevue/inputnumber';

// Predefined Categories
const predefinedCategories = [
  { name: "Food", value: "Food" },
  { name: "Transport", value: "Transport" },
  { name: "Entertainment", value: "Entertainment" },
  { name: "Health", value: "Health" },
  { name: "Bills", value: "Bills" },
  { name: "Groceries", value: "Groceries" },
  { name: "Shopping", value: "Shopping" },
  { name: "Subscriptions", value: "Subscriptions" },
  { name: "Dining", value: "Dining" },
  { name: "Education", value: "Education" },
  { name: "Other", value: "Other" },
];

// Reactive States
const categories = ref(predefinedCategories.map(cat => cat.value));
const budgets = ref({});             // Stores user-defined budgets per category
const totalSpending = ref({});       // Stores total spending per category
const transactions = ref([]);        // Reactive storage for transactions
const displayEditDialog = ref(false);
const currentEditCategory = ref('');
const tempBudget = ref(0);

// Inject transaction data from parent
const transactionData = inject('transactionData', []);

// PrimeVue Toast for notifications
const toast = useToast();

// Load budgets from localStorage
const loadBudgets = () => {
  const savedBudgets = localStorage.getItem('budgets');
  if (savedBudgets) {
    try {
      const parsedBudgets = JSON.parse(savedBudgets);
      // Ensure all categories are present
      categories.value.forEach(category => {
        budgets.value[category] = typeof parsedBudgets[category] === 'number'
          ? parsedBudgets[category]
          : 0;
      });
    } catch (error) {
      console.error("Error parsing budgets from localStorage:", error);
      categories.value.forEach(category => {
        budgets.value[category] = 0;
      });
    }
  } else {
    categories.value.forEach(category => {
      budgets.value[category] = 0;
    });
  }
};

// Save budgets to localStorage
const saveBudgets = () => {
  localStorage.setItem('budgets', JSON.stringify(budgets.value));
};

// Calculate total spending for each category
const calculateTotals = () => {
  const totals = {};
  // Initialize totals for all categories
  categories.value.forEach(category => {
    totals[category] = 0;
  });

  // Ensure transactions.value is an array before proceeding
  if (Array.isArray(transactions.value)) {
    transactions.value.forEach(tx => {
      // Only consider expenses
      if (!tx.isIncome) {
        const category = tx.category || 'Other';
        const amount = typeof tx.amount === 'number' ? tx.amount : 0;
        if (totals.hasOwnProperty(category)) {
          totals[category] += amount;
        } else {
          totals['Other'] += amount; // Unrecognized => 'Other'
        }
      }
    });
  }

  totalSpending.value = totals;
};

// Watcher: React to changes in transactionData
watch(
  () => transactionData,
  (newData) => {
    transactions.value = Array.isArray(newData) ? newData : [];
    calculateTotals();
  },
  { immediate: true, deep: true }
);

// Helper: Format numbers to two decimal places
const formatNumber = (num) => {
  if (typeof num !== 'number' || isNaN(num)) {
    return '0.00';
  }
  return num.toFixed(2);
};

// Helper: Determine if a category is over budget
const isOverBudget = (category) => {
  const target = typeof budgets.value[category] === 'number' ? budgets.value[category] : 0;
  const spent = typeof totalSpending.value[category] === 'number' ? totalSpending.value[category] : 0;
  return target > 0 && spent > target;
};

// Helper: Get the progress percentage for the category
const getProgressPercentage = (category) => {
  const target = typeof budgets.value[category] === 'number' ? budgets.value[category] : 0;
  const spent = typeof totalSpending.value[category] === 'number' ? totalSpending.value[category] : 0;
  return target > 0 ? Math.min((spent / target) * 100, 100) : 0;
};

// Helper: Filter transactions by category (only expenses)
const filteredTransactions = (category) => {
  if (!Array.isArray(transactions.value)) return [];
  return transactions.value.filter(tx => {
    const txCategory = tx.category || 'Other';
    const isValidAmount = typeof tx.amount === 'number' && !isNaN(tx.amount);
    return txCategory === category && !tx.isIncome && isValidAmount;
  });
};

// Open the dialog for editing the budget
const openEditDialog = (category) => {
  currentEditCategory.value = category;
  tempBudget.value = typeof budgets.value[category] === 'number' ? budgets.value[category] : 0;
  displayEditDialog.value = true;
};

// Save the updated budget
const saveBudget = () => {
  budgets.value[currentEditCategory.value] = typeof tempBudget.value === 'number'
    ? tempBudget.value
    : 0;
  saveBudgets();
  displayEditDialog.value = false;

  toast.add({
    severity: 'success',
    summary: 'Budget Updated',
    detail: `Budget for ${currentEditCategory.value} updated to $${formatNumber(tempBudget.value)}`,
    life: 3000,
  });
};

// Cancel editing the budget
const cancelEdit = () => {
  displayEditDialog.value = false;
};

// Initialize budgets and totals on mount
onMounted(() => {
  loadBudgets();
  calculateTotals();
});
</script>

<style scoped>
/* Container Styles */
.container {
  max-width: 900px;
  margin: 20px auto;
  padding: 20px;
  font-family: 'Arial, sans-serif';
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Header Styles */
.header {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

/* Category Card Styles */
.category-card {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* Category Header */
.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.category-name {
  margin: 0;
  color: #555;
  font-size: 1.25rem;
  font-weight: 500;
}

/* Budget Controls */
.budget-controls {
  display: flex;
  align-items: center;
}

.budget-value {
  margin-right: 10px;
  font-weight: bold;
  color: #333;
}

/* Edit Button */
.edit-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
}

.edit-button:hover {
  color: #007ad9; /* Change to desired hover color */
}

/* Progress Bar */
.progress-bar {
  margin: 10px 0;
  height: 20px;
  border-radius: 4px;
}

/* Spending Info */
.spending-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  font-size: 0.875rem;
}

.over-budget {
  color: #e74c3c;
  font-weight: bold;
}

.under-budget {
  color: #2ecc71;
  font-weight: bold;
}

/* Transactions List */
.transaction-container {
  max-height: 200px;
  overflow-y: auto;
  margin-top: 15px;
}

.transaction-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.transaction-item:last-child {
  border-bottom: none;
}

.description {
  color: #666;
}

.amount {
  font-weight: bold;
}

.amount.income {
  color: #2ecc71;
}

.amount.expense {
  color: #e74c3c;
}

/* Dialog Styles */
.edit-dialog .p-dialog {
  width: 350px;
}

.dialog-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.dialog-label {
  font-size: 0.875rem;
}

.input-number {
  width: 100%;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

/* Responsive Styles */
@media (max-width: 600px) {
  .category-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .budget-controls {
    margin-top: 10px;
  }
}

/* Optional: Test Card Styles */
.test-card {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #e3f2fd; /* Light blue background for visibility */
}
</style>
