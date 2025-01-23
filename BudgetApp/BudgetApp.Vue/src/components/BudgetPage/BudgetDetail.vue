<template>
  <div class="budget-page">
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
          <div class="budget-page__summary-title">Total Savings</div>
        </template>
        <template #content>
          <div class="budget-page__summary-value budget-page__summary-value--savings">
            ${{ formatNumber(totalSavings) }}
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
      <Card v-for="category in budgetCategories" :key="category.name" class="budget-page__category">
        <template #header>
          <div class="budget-page__category-header">
            <h3 class="budget-page__category-title">{{ category.name }}</h3>
            <Button
              icon="pi pi-pencil"
              class="p-button-text"
              @click="openEditDialog(category.name)"
              v-tooltip.top="'Edit Target'"
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

          <div class="budget-page__transactions">
            <DataTable :value="filteredTransactions(category.name)" :rows="5" responsiveLayout="scroll">
              <Column field="description" header="Description" class="budget-page__transactions-description" />
              <Column field="amount" header="Amount" class="budget-page__transactions-amount">
                <template #body="slotProps">
                  <span :class="{ 'budget-page__transactions-amount--expense': !slotProps.data.isIncome }">
                    ${{ formatNumber(slotProps.data.amount) }}
                  </span>
                </template>
              </Column>
            </DataTable>
          </div>
        </template>
      </Card>

      <Dialog
        v-model:visible="displayEditDialog"
        modal
        header="Edit Budget"
        :style="{ width: '400px' }"
        :closable="false"
      >
        <div class="budget-page__dialog-form">
          <label :for="'budget-' + currentEditCategory" class="budget-page__dialog-label">
            Set budget for <strong>{{ currentEditCategory }}</strong>:
          </label>
          <InputNumber
            :id="'budget-' + currentEditCategory"
            v-model="tempBudget"
            mode="currency"
            currency="USD"
            locale="en-US"
            :min="0"
            :max="1000000"
          />
        </div>
        <template #footer>
          <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="cancelEdit" />
          <Button label="Save" icon="pi pi-check" @click="saveBudget" autofocus />
        </template>
      </Dialog>
    </div>
  </div>
</template>

<script setup>
import { inject, ref, reactive, watch, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
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
const totalSavings = ref(0);
const totalBudgeted = ref(0);
const displayEditDialog = ref(false);
const currentEditCategory = ref('');
const tempBudget = ref(0);

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

  // Set default values if not already in localStorage
  predefinedCategories.forEach((category) => {
    if (budgets.value[category.name] === undefined) {
      budgets.value[category.name] = category.defaultValue;
    }
  });
};

const saveBudgets = () => {
  localStorage.setItem('budgets', JSON.stringify(budgets.value));
};

const calculateTotals = () => {
  const transactions = Array.isArray(transactionData.transactions)
    ? transactionData.transactions
    : [];

  const expenses = transactions.filter((transaction) => !transaction.isIncome);
  const incomes = transactions.filter((transaction) => transaction.isIncome);

  totalSpending.value = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  totalSavings.value = incomes.reduce((acc, income) => acc + income.amount, 0) - totalSpending.value;
  totalBudgeted.value = Object.values(budgets.value).reduce((acc, budget) => acc + budget, 0);
};

const calculateCategoryData = () => {
  const transactions = Array.isArray(transactionData.transactions)
    ? transactionData.transactions
    : [];

  const expenses = transactions.filter((transaction) => !transaction.isIncome);

  const categoryStats = expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = { transactionCount: 0, totalSpent: 0 };
    }
    acc[expense.category].transactionCount += 1;
    acc[expense.category].totalSpent += expense.amount;
    return acc;
  }, {});

  budgetCategories.value = predefinedCategories.map((category) => ({
    name: category.value,
    transactionCount: categoryStats[category.value]?.transactionCount || 0,
    totalSpent: categoryStats[category.value]?.totalSpent || 0,
  }));
};

const formatNumber = (num) => {
  return new Intl.NumberFormat('en-US').format(num?.toFixed(2));
};

const isOverBudget = (categoryName) => {
  const category = budgetCategories.value.find(c => c.name === categoryName);
  const target = budgets.value[categoryName] || 0;
  return category && target > 0 && category.totalSpent > target;
};

const getProgressPercentage = (categoryName) => {
  const category = budgetCategories.value.find(c => c.name === categoryName);
  const target = budgets.value[categoryName] || 0;
  return category && target > 0 ? Math.min((category.totalSpent / target) * 100, 100) : 0;
};

const filteredTransactions = (categoryName) => {
  return transactionData.transactions.filter(
    (tx) => !tx.isIncome && tx.category === categoryName
  );
};

const openEditDialog = (categoryName) => {
  currentEditCategory.value = categoryName;
  tempBudget.value = budgets.value[categoryName] || 0;
  displayEditDialog.value = true;
};

const saveBudget = () => {
  budgets.value[currentEditCategory.value] = tempBudget.value;
  saveBudgets();
  displayEditDialog.value = false;
  calculateTotals(); // Recalculate totals after budget update

  toast.add({
    severity: 'success',
    summary: 'Budget Updated',
    detail: `Budget for ${currentEditCategory.value} updated to $${formatNumber(tempBudget.value)}`,
    life: 3000,
  });
};

const cancelEdit = () => {
  displayEditDialog.value = false;
};

watch(
  () => transactionData.transactions,
  () => {
    calculateTotals();
    calculateCategoryData();
  },
  { deep: true }
);

onMounted(() => {
  loadBudgets();
  calculateTotals();
  calculateCategoryData();
});
</script>

<style scoped>
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
}

.budget-page__category-title {
  font-size: 1.25rem;
  color: #495057;
  margin: 0;
}

/* Progress Bar */
.budget-page__progress {
  margin-bottom: 1rem;
}

.budget-page__progress-bar {
  height: 1.5rem;
}

.budget-page__progress-bar--over :deep(.p-progressbar-value) {
  background-color: #dc3545;
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

/* Transactions Table */
.budget-page__transactions {
  margin-top: 1.5rem;
}

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

/* Edit Dialog */
.budget-page__dialog-form {
  margin-bottom: 1.5rem;
}

.budget-page__dialog-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #495057;
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