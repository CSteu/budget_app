<template>
  <div class="expense-tracker">
    <h1>Recent Transactions</h1>
    <div class="content">
      <div class="expense-table-container">
        <DataTable
          :value="filteredTransactions"
          :paginator="true"
          :rows="8"
          responsiveLayout="scroll"
          class="expense-table"
        >
          <Column field="date" header="Date">
            <template #body="slotProps">
              <span class="date-cell">{{ slotProps.data.formattedDate }}</span>
            </template>
          </Column>
          <Column field="description" header="Description" />
          <Column field="category" header="Category" />
          <Column field="amount" header="Amount">
            <template #body="slotProps">
              <span class="amount-cell">
                {{ `$${slotProps.data.amount.toFixed(2)}` }}
              </span>
            </template>
          </Column>
          <Column field="actions" header="Actions">
            <template #body="slotProps">
              <span class="action-cell">
                <button
                  class="transaction-btn"
                  @click="openEditDialog(slotProps.data)"
                >
                  <i class="pi pi-pencil"></i>
                </button>
                <button
                  class="transaction-btn"
                  @click="deleteTransactionHandler(slotProps.data.id)"
                >
                  <i class="pi pi-trash"></i>
                </button>
              </span>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>

    <Dialog
      header="Edit Transaction"
      :visible="isEditModalOpen"
      :modal="true"
      :closable="false"
      @hide="closeEditDialog"
      style="width: 40vw"
    >
      <form @submit.prevent="saveTransaction" class="form">
        <div class="form-field">
          <label for="date">Date</label>
          <input
            id="date"
            type="date"
            v-model="editTransaction.date"
            required
            class="input-field"
          />
          <small class="field-info">Select the date of the transaction.</small>
        </div>

        <div class="form-field">
          <label for="description">Description</label>
          <InputText
            id="description"
            v-model="editTransaction.description"
            required
            class="input-field"
            placeholder="Enter a brief description (e.g., Groceries, Taxi Ride)"
          />
          <small class="field-info">Provide a brief description of the transaction.</small>
        </div>

        <div class="form-field">
          <label for="category">Category</label>
          <Dropdown
            id="category"
            v-model="editTransaction.category"
            :options="categories"
            optionLabel="name"
            optionValue="value"
            placeholder="Select a Category"
            required
            class="input-field"
            panelClass="dropdown-panel"
            panelStyle="background-color: white; color: black;"
          />
          <small class="field-info">Choose the category that best describes this transaction.</small>
        </div>

        <div class="form-field">
          <label for="amount">Amount</label>
          <InputNumber
            id="amount"
            v-model.number="editTransaction.amount"
            mode="currency"
            currency="USD"
            locale="en-US"
            required
            class="input-field"
          />
          <small class="field-info">Enter the amount of the transaction.</small>
        </div>

        <div class="form-actions">
          <button
            type="button"
            class="submit-button"
            @click="closeEditDialog"
            style="background-color: #dc3545;"
          >
            Cancel
          </button>
          <button type="submit" class="submit-button">Save</button>
        </div>
      </form>
    </Dialog>
  </div>
</template>

<script>
import DataTable from "primevue/datatable"
import Column from "primevue/column"
import Dialog from "primevue/dialog"
import InputText from "primevue/inputtext"
import Dropdown from "primevue/dropdown"
import InputNumber from "primevue/inputnumber"
import { updateTransaction, deleteTransaction, loadSavingsData, loadSpendingData } from "@/store/ApiConnections"
import { refreshData } from "@/store/ApiConnections"

export default {
  components: {
    DataTable,
    Column,
    Dialog,
    InputText,
    Dropdown,
    InputNumber
  },
  inject: ["spendingData", "incomeData"],
  data() {
    return {
      filteredTransactions: [],
      isEditModalOpen: false,
      editTransaction: {},
      categories: [
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
        { name: "Other", value: "Other" }
      ]
    }
  },
  computed: {
    expenses() {
      return Array.isArray(this.spendingData?.expenses)
        ? this.spendingData.expenses
        : []
    },
    incomes() {
      return Array.isArray(this.incomeData?.incomes)
        ? this.incomeData.incomes
        : []
    },
    transactions() {
      const negativeExpenses = this.expenses.map((expense) => ({
        ...expense,
        amount: -Math.abs(expense.amount)
      }))
      return [...negativeExpenses, ...this.incomes]
    }
  },
  methods: {
    async refreshDataFromApi() {
      try {
        refreshData()
      } catch (e) {
        console.error(e)
      }
    },
    updateFilteredTransactions() {
      const now = new Date()
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(now.getDate() - 30)
      this.filteredTransactions = this.transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date)
        return transactionDate >= thirtyDaysAgo && transactionDate <= now
      })
      this.filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date))
      this.groupAndFormatDates()
    },
    groupAndFormatDates() {
      let lastFormattedDate = null
      this.filteredTransactions.forEach((transaction) => {
        const currentDate = new Date(transaction.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric"
        })
        if (currentDate !== lastFormattedDate) {
          transaction.formattedDate = currentDate
          lastFormattedDate = currentDate
        } else {
          transaction.formattedDate = ""
        }
      })
    },
    openEditDialog(transaction) {
      const today = new Date().toISOString().split("T")[0]
      let formattedDate = today
      if (transaction.date) {
        const dateObj = new Date(transaction.date)
        if (!isNaN(dateObj.getTime())) {
          formattedDate = dateObj.toISOString().split("T")[0]
        }
      }
      this.editTransaction = {
        ...transaction,
        date: formattedDate,
        amount: Math.abs(transaction.amount)
      }
      this.isEditModalOpen = true
    },
    closeEditDialog() {
      this.isEditModalOpen = false
      this.editTransaction = {}
    },
    async saveTransaction() {
      try {
        const updated = await updateTransaction(this.editTransaction)
        this.mergeUpdatedTransaction(updated)
        this.closeEditDialog()
        await this.refreshDataFromApi()
      } catch (error) {
        console.error("Error saving transaction:", error)
      }
    },
    mergeUpdatedTransaction(updated) {
      if (!updated) return
      if (updated.isIncome) {
        const index = this.incomes.findIndex((t) => t.id === updated.id)
        if (index !== -1) {
          this.incomes.splice(index, 1, updated)
        } else {
          const expIndex = this.expenses.findIndex((t) => t.id === updated.id)
          if (expIndex !== -1) {
            this.expenses.splice(expIndex, 1)
          }
          this.incomes.push(updated)
        }
      } else {
        const index = this.expenses.findIndex((t) => t.id === updated.id)
        if (index !== -1) {
          this.expenses.splice(index, 1, updated)
        } else {
          const incIndex = this.incomes.findIndex((t) => t.id === updated.id)
          if (incIndex !== -1) {
            this.incomes.splice(incIndex, 1)
          }
          this.expenses.push(updated)
        }
      }
    },
    async deleteTransactionHandler(transactionId) {
      try {
        await deleteTransaction(transactionId)
        this.spendingData.expenses = this.spendingData.expenses.filter(
          (t) => t.id !== transactionId
        )
        this.incomeData.incomes = this.incomeData.incomes.filter(
          (t) => t.id !== transactionId
        )
        this.updateFilteredTransactions()
      } catch (error) {
        console.error("Error deleting transaction:", error)
      }
    }
  },
  watch: {
    "spendingData.expenses": {
      handler() {
        this.updateFilteredTransactions()
      },
      deep: true
    },
    "incomeData.incomes": {
      handler() {
        this.updateFilteredTransactions()
      },
      deep: true
    }
  },
  mounted() {
    this.updateFilteredTransactions()
  }
}
</script>

<style>
body {
  font-family: 'Poppins', sans-serif;
  background-color: #f0f2f5;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.expense-tracker {
  max-width: 1200px;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

h1 {
  font-weight: 600;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 0.5rem;
}

.content {
  display: flex;
  gap: 2rem;
}

.expense-table-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 400px;
}

.expense-table .p-datatable {
  border: none;
}

.expense-table .p-datatable-header {
  display: none;
}

.expense-table .p-datatable-thead > tr > th {
  color: var(--vt-c-text-dark-2);
  font-weight: 600;
  text-align: left;
  font-size: 0.9rem;
}

.expense-table .p-datatable-tbody > tr > td {
  border: none;
  padding: 0.75rem 0;
  color: #34495e;
  text-align: left;
  height: 2.5rem;
}

.p-datatable-wrapper {
  display: flex;
  flex-direction: column;
  height: 26rem;
}

.expense-table {
  flex-grow: 1;
  overflow: hidden;
}

.p-paginator {
  flex-shrink: 0;
  margin-top: 1rem;
  background-color: #ffffff;
}

.p-paginator .p-paginator-pages .p-paginator-page {
  margin: 0 0.5rem;
}

.p-paginator .p-paginator-page {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background-color: #ecf0f1;
  color: rgb(0, 162, 199);
  transition: all 0.3s ease;
  font-weight: 500;
}

.p-paginator .p-paginator-page-selected {
  background-color: rgba(0, 162, 199, 0.8) !important;
  color: #ffffff !important;
}

.p-paginator .p-paginator-page:hover {
  background-color: #dcdedf !important;
  color: rgb(0, 162, 199) !important;
}

.p-datatable-paginator-bottom {
  border-style: none !important;
}

.p-datatable-table-container {
  min-height: 26rem;
}

.date-cell {
  color: var(--vt-c-text-dark-2);
}

.amount-cell {
  display: block;
  text-align: right;
  margin-right: 1rem;
}

.transaction-btn {
  background-color: transparent;
  border: none;
  color: rgba(0, 162, 199, 0.5);
  font-size: 1rem;
}

.transaction-btn:hover {
  color: rgba(0, 118, 145, 0.65);
}

.p-dialog-mask {
  background-color: rgba(0, 0, 0, 0.5) !important;
  display: flex;
  justify-content: center;
  align-items: center;
}

.p-dialog {
  background-color: #ffffff !important;
  border-radius: 12px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 1.5rem;
  max-width: 90%;
}

.p-dialog-header {
  font-size: 1.25rem;
  font-weight: bold;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 1rem;
}

.p-fluid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.p-field label {
  font-weight: bold;
  color: #34495e;
  margin-bottom: 0.5rem;
}

.p-inputtext {
  border-radius: 8px;
  border: 1px solid #dcdedf;
  padding: 0.5rem;
  font-size: 1rem;
  width: 100%;
  box-shadow: none;
}

.p-inputtext:focus {
  border-color: rgba(0, 162, 199, 0.8);
  box-shadow: 0 0 0 2px rgba(0, 162, 199, 0.2);
}

.p-dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.p-button {
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.p-button-primary {
  background-color: #3498db;
  color: #ffffff;
}

.p-button-primary:hover {
  background-color: #2980b9;
}

.p-button-text {
  background-color: #ecf0f1;
  color: #2c3e50;
}

.p-button-text:hover {
  background-color: #dcdedf;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-field {
  display: flex;
  flex-direction: column;
}

.form-field label {
  font-size: 1rem;
  font-weight: bold;
  color: rgb(0, 162, 199);
  margin-bottom: 0.5rem;
}

.input-field {
  background-color: white !important;
  color: black !important;
  border: 1px solid rgb(0, 162, 199) !important;
  border-radius: 8px !important;
  padding: 0.5rem !important;
  width: 100% !important;
}

.field-info {
  display: block;
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.5rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.submit-button {
  background-color: rgb(0, 162, 199);
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  padding: 0.7rem 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #023e8a;
}

.submit-button[style*="background-color: #dc3545;"]:hover {
  background-color: #b32d3a;
}
</style>
