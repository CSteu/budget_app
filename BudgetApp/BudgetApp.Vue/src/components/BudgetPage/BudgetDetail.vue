<template>
  <div class="budget-page">
    <div class="budget-page__header">
      <div class="budget-page__month-selector">
        <Button
          icon="pi pi-angle-left"
          class="p-button-secondary"
          @click="goToPreviousMonth"
          :disabled="isPastMonth"
          v-tooltip.top="'Previous Month'"
        />
        <span class="budget-page__current-month">{{ currentMonthYear }}</span>
        <Button
          icon="pi pi-angle-right"
          class="p-button-secondary"
          @click="goToNextMonth"
          :disabled="isCurrentMonth"
          v-tooltip.top="'Next Month'"
        />
        <Button
          icon="pi pi-calendar"
          class="p-button-success"
          @click="goToCurrentMonth"
          v-tooltip.top="'Jump to Current Month'"
          :disabled="isCurrentMonth"
        />
      </div>
      <div class="budget-page__edit-button">
        <Button
          v-if="!isEditing"
          icon="pi pi-pencil"
          class="p-button-info"
          @click="isEditing = true"
          v-tooltip.top="'Edit Targets'"
        />
        <Button
          v-else
          icon="pi pi-times"
          class="p-button-danger"
          @click="handleCancelEdit"
          v-tooltip.top="'Cancel Edit'"
        />
      </div>
    </div>

    <div class="budget-page__summary-panels">
      <Card class="budget-page__summary-panel">
        <template #title>
          <div class="budget-page__summary-title">Total Spending</div>
        </template>
        <template #content>
          <div class="budget-page__summary-value budget-page__summary-value--spending">
            ${{ formatNumber(totalSpending) }}
          </div>
        </template>
      </Card>

      <Card class="budget-page__summary-panel">
        <template #title>
          <div class="budget-page__summary-title">Total Earnings</div>
        </template>
        <template #content>
          <div class="budget-page__summary-value budget-page__summary-value--savings">
            ${{ formatNumber(totalEarnings) }}
          </div>
        </template>
      </Card>

      <Card class="budget-page__summary-panel">
        <template #title>
          <div class="budget-page__summary-title">Total Budgeted</div>
        </template>
        <template #content>
          <div class="budget-page__summary-value">
            ${{ formatNumber(totalBudgeted) }}
          </div>
        </template>
      </Card>
    </div>

    <div class="budget-page__categories">
      <Card
        v-for="category in budgetCategories"
        :key="category.name"
        class="budget-page__category"
      >
        <template #header>
          <div class="budget-page__category-header">
            <h3 class="budget-page__category-title">{{ category.name }}</h3>
            <InputNumber
              v-if="isEditing"
              v-model="budgets[category.name]"
              mode="currency"
              currency="USD"
              locale="en-US"
              :min="0"
              :max="1000000"
              class="budget-page__category-input"
            />
          </div>
        </template>
        <template #content>
          <div class="budget-page__progress">
            <ProgressBar
              :value="getProgressPercentage(category.name)"
              :showValue="false"
              class="budget-page__progress-bar"
              :class="{ 'budget-page__progress-bar--over': isOverBudget(category.name) }"
            />
            <div class="budget-page__progress-labels">
              <span class="budget-page__progress-label">
                Spent: ${{ formatNumber(category.totalSpent || 0) }}
              </span>
              <span class="budget-page__progress-label">
                Target: ${{ formatNumber(budgets[category.name] || 0) }}
              </span>
            </div>
          </div>

          <!-- Toggle Button for Transactions -->
          <Button
            class="p-button-text budget-page__toggle-button"
            :icon="showTransactions[category.name] ? 'pi pi-chevron-up' : 'pi pi-chevron-down'"
            label="Transactions"
            @click="toggleTransactions(category.name)"
          />

          <!-- Collapsible Transactions Table -->
          <div
            v-show="showTransactions[category.name]"
            class="budget-page__transactions-dropdown"
          >
            <DataTable
              :value="filteredTransactions(category.name)"
              :rows="5"
              responsiveLayout="scroll"
            >
              <Column
                field="description"
                header="Description"
                class="budget-page__transactions-description"
              />
              <Column
                field="amount"
                header="Amount"
                class="budget-page__transactions-amount"
              >
                <template #body="slotProps">
                  <span
                    :class="{
                      'budget-page__transactions-amount--expense':
                        !slotProps.data.isIncome,
                    }"
                  >
                    ${{ formatNumber(slotProps.data.amount) }}
                  </span>
                </template>
              </Column>
            </DataTable>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { inject, ref, reactive, watch, onMounted, computed } from 'vue';
import { useToast } from 'primevue/usetoast';
import Card from 'primevue/card';
import Button from 'primevue/button';
import ProgressBar from 'primevue/progressbar';
import InputNumber from 'primevue/inputnumber';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tooltip from 'primevue/tooltip';

const transactionData = inject('transactionData', []);
const toast = useToast();

const predefinedCategories = [
  { name: "Food", value: "Food", defaultValue: 200 },
  { name: "Transport", value: "Transport", defaultValue: 100 },
  { name: "Entertainment", value: "Entertainment", defaultValue: 50 },
  { name: "Health", value: "Health", defaultValue: 50 },
  { name: "Bills", value: "Bills", defaultValue: 100 },
  { name: "Groceries", value: "Groceries", defaultValue: 150 },
  { name: "Shopping", value: "Shopping", defaultValue: 50 },
  { name: "Subscriptions", value: "Subscriptions", defaultValue: 50 },
  { name: "Dining", value: "Dining", defaultValue: 100 },
  { name: "Education", value: "Education", defaultValue: 50 },
  { name: "Other", value: "Other", defaultValue: 50 },
];

const budgetCategories = ref([]);
const budgets = ref({});
const totalSpending = ref(0);
const totalEarnings = ref(0);
const totalBudgeted = ref(0);
const isEditing = ref(false);

/**
 * Track if the transaction list is shown or hidden for each category.
 * e.g., showTransactions["Food"] = true/false
 */
const showTransactions = reactive({});

const currentDate = new Date();
const currentMonth = ref(currentDate.getMonth());
const currentYear = ref(currentDate.getFullYear());

const currentMonthYear = computed(() => {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return `${monthNames[currentMonth.value]} ${currentYear.value}`;
});

const isCurrentMonth = computed(() => {
  const today = new Date();
  return (
    currentMonth.value === today.getMonth() &&
    currentYear.value === today.getFullYear()
  );
});

const minYear = 2000;

const isPastMonth = computed(() => {
  return currentYear.value === minYear && currentMonth.value === 0;
});

/** Load budgets from local storage or set defaults. */
const loadBudgets = () => {
  const savedBudgets = localStorage.getItem('budgets');
  if (savedBudgets) {
    try {
      budgets.value = JSON.parse(savedBudgets);
    } catch (error) {
      console.error("Error parsing budgets from localStorage:", error);
      budgets.value = {};
    }
  }

  predefinedCategories.forEach(category => {
    if (budgets.value[category.name] === undefined) {
      budgets.value[category.name] = category.defaultValue;
    }
  });
};

/** Save budgets to local storage. */
const saveBudgets = () => {
  localStorage.setItem('budgets', JSON.stringify(budgets.value));
};

/** Update total spending, earnings, and budgeted values based on the current month/year. */
const calculateTotals = () => {
  const transactions = Array.isArray(transactionData.transactions)
    ? transactionData.transactions.filter(transaction => {
        const [year, month] = transaction.date.split('-').map(Number);
        return currentMonth.value === (month - 1) && currentYear.value === year;
      })
    : [];

  const expenses = transactions.filter(t => !t.isIncome);
  const incomes = transactions.filter(t => t.isIncome);

  totalSpending.value = expenses.reduce((acc, e) => acc + e.amount, 0);
  totalEarnings.value = incomes.reduce((acc, i) => acc + i.amount, 0);
  totalBudgeted.value = Object.values(budgets.value).reduce(
    (acc, budget) => acc + budget,
    0
  );
};

/** Calculate how much is spent per category in the current month/year. */
const calculateCategoryData = () => {
  const transactions = Array.isArray(transactionData.transactions)
    ? transactionData.transactions.filter(transaction => {
        const [year, month] = transaction.date.split('-').map(Number);
        return currentMonth.value === (month - 1) && currentYear.value === year;
      })
    : [];

  const expenses = transactions.filter(transaction => !transaction.isIncome);

  const categoryStats = expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = { transactionCount: 0, totalSpent: 0 };
    }
    acc[expense.category].transactionCount += 1;
    acc[expense.category].totalSpent += expense.amount;
    return acc;
  }, {});

  budgetCategories.value = predefinedCategories.map(category => ({
    name: category.value,
    transactionCount: categoryStats[category.value]?.transactionCount || 0,
    totalSpent: categoryStats[category.value]?.totalSpent || 0,
  }));
};

/** Helper to format numbers as USD. */
const formatNumber = (num) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num || 0);
};

/** Check if a category is over budget. */
const isOverBudget = (categoryName) => {
  const category = budgetCategories.value.find(c => c.name === categoryName);
  const target = budgets.value[categoryName] || 0;
  return category && target > 0 && category.totalSpent > target;
};

/** Return progress percentage for progress bars. */
const getProgressPercentage = (categoryName) => {
  const category = budgetCategories.value.find(c => c.name === categoryName);
  const target = budgets.value[categoryName] || 0;
  if (category && target > 0) {
    return Math.min((category.totalSpent / target) * 100, 100);
  }
  return 0;
};

/** Filter transactions for a specific category and current month/year. */
const filteredTransactions = (categoryName) => {
  return (transactionData.transactions || []).filter(
    (tx) =>
      !tx.isIncome &&
      tx.category === categoryName &&
      parseInt(tx.date.split('-')[1]) === currentMonth.value + 1 &&
      parseInt(tx.date.split('-')[0]) === currentYear.value
  );
};

/** Cancel editing budgets. */
const handleCancelEdit = () => {
  isEditing.value = false;
  loadBudgets(); // Reload from localStorage to discard unsaved changes
};

/** Navigation: Go to previous month. */
const goToPreviousMonth = () => {
  if (currentMonth.value > 0) {
    currentMonth.value--;
  } else if (currentYear.value > minYear) {
    currentMonth.value = 11;
    currentYear.value--;
  }
};

/** Navigation: Go to next month (if not the current month). */
const goToNextMonth = () => {
  const today = new Date();
  if (currentYear.value < today.getFullYear() ||
      (currentYear.value === today.getFullYear() && currentMonth.value < today.getMonth())
  ) {
    if (currentMonth.value < 11) {
      currentMonth.value++;
    } else {
      currentMonth.value = 0;
      currentYear.value++;
    }
  }
};

/** Navigation: Jump to the current month/year. */
const goToCurrentMonth = () => {
  const today = new Date();
  currentMonth.value = today.getMonth();
  currentYear.value = today.getFullYear();
};

/** Toggle the display of transactions for a given category. */
const toggleTransactions = (categoryName) => {
  showTransactions[categoryName] = !showTransactions[categoryName];
};

watch(
  () => transactionData.transactions,
  () => {
    calculateTotals();
    calculateCategoryData();
  },
  { deep: true }
);

watch(
  () => [currentMonth.value, currentYear.value],
  () => {
    calculateTotals();
    calculateCategoryData();
  }
);

watch(isEditing, (newVal) => {
  if (!newVal) {
    saveBudgets();
    calculateTotals();

    toast.add({
      severity: 'success',
      summary: 'Budgets Saved',
      detail: 'Your budget changes have been saved.',
      life: 3000,
    });
  }
});

onMounted(() => {
  loadBudgets();
  calculateTotals();
  calculateCategoryData();

  // Initialize showTransactions to false for all categories
  predefinedCategories.forEach(category => {
    showTransactions[category.value] = false;
  });
});
</script>

<style scoped>
/* Month Selector */
.budget-page__month-selector {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
}

.budget-page__current-month {
  font-size: 1.25rem;
  font-weight: 600;
  color: #495057;
}

/* Edit Button */
.budget-page__edit-button {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
}

/* Page Container */
.budget-page {
  font-family: "Arial", sans-serif;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.budget-page__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Summary Panels */
.budget-page__summary-panels {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  gap: 1.5rem;
}

.budget-page__summary-panel {
  flex: 1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

.budget-page__summary-title {
  font-size: 1.1rem;
  color: #495057;
}

.budget-page__summary-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: #343a40;
}

.budget-page__summary-value--spending {
  color: #dc3545; /* Red for spending */
}

.budget-page__summary-value--savings {
  color: #28a745; /* Green for savings */
}

/* Category Grid */
.budget-page__categories {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

/* Category Card */
.budget-page__category {
  flex: 1 1 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

.budget-page__category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
}

.budget-page__category-title {
  font-size: 1.25rem;
  color: #495057;
  margin: 0;
}

/* Category Input */
.budget-page__category-input {
  max-width: 120px;
}

/* Progress Bar */
.budget-page__progress {
  margin-bottom: 1rem;
}

.budget-page__progress-bar {
  height: 1.5rem;
}

.budget-page__progress-bar--over :deep(.p-progressbar-value) {
  background-color: #dc3545; /* Red color for over budget */
}

.budget-page__progress-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  font-size: 0.875rem;
}

.budget-page__progress-label {
  color: #6c757d;
}

/* Transactions Collapsible Section */
.budget-page__transactions-dropdown {
  margin-top: 1rem;
}

/* Transactions Table */
.budget-page__transactions-description {
  font-size: 0.875rem;
  color: #495057;
}

.budget-page__transactions-amount {
  font-size: 0.875rem;
  font-weight: 600;
  text-align: right;
}

.budget-page__transactions-amount--expense {
  color: #dc3545;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .budget-page__summary-panels {
    flex-direction: column;
  }

  .budget-page__categories {
    flex-direction: column;
  }
}
</style>
