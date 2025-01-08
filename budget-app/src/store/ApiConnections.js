import { reactive } from "vue"
import api from "@/api/axios"

export const savingsData = reactive({
  SavingsAmount: []
})

async function loadSavingsFromAPI() {
  try {
    const response = await api.get("/api/accounts")
    return response.data.filter((account) => !account.isChecking)
  } catch (error) {
    console.error("Error loading savings:", error)
    return []
  }
}

export async function loadSavingsData() {
  savingsData.SavingsAmount = await loadSavingsFromAPI()
}

export const checkingData = reactive({
  CheckingAmount: []
})

async function loadCheckingFromAPI() {
  try {
    const response = await api.get("/api/accounts")
    return response.data.filter((account) => account.isChecking)
  } catch (error) {
    console.error("Error loading checking:", error)
    return []
  }
}

export async function loadCheckingData() {
  checkingData.CheckingAmount = await loadCheckingFromAPI()
}

export const spendingData = reactive({
  expenses: []
})

async function loadSpendingFromAPI() {
  try {
    const response = await api.get("/api/transactions")
    return response.data.filter((transaction) => !transaction.isIncome)
  } catch (error) {
    console.error("Error loading spending:", error)
    return []
  }
}

export async function loadSpendingData() {
  spendingData.expenses = await loadSpendingFromAPI()
}

export const incomeData = reactive({
  incomes: []
})

async function loadIncomeFromAPI() {
  try {
    const response = await api.get("/api/transactions")
    return response.data.filter((transaction) => transaction.isIncome)
  } catch (error) {
    console.error("Error loading income:", error)
    return []
  }
}

export async function loadIncomeData() {
  incomeData.incomes = await loadIncomeFromAPI()
}

export const transferData = reactive({
  transfers: []
})

async function loadTransfersFromAPI() {
  try {
    const response = await api.get("/api/transfers")
    return response.data
  } catch (error) {
    console.error("Error loading transfers:", error)
    return []
  }
}

export async function loadTransferData() {
  transferData.transfers = await loadTransfersFromAPI()
}

export async function addSpending(newSpending) {
  try {
    const response = await api.post("/api/transactions", {
      description: newSpending.description,
      amount: newSpending.amount,
      date: newSpending.date,
      category: newSpending.category,
      isIncome: false
    })
    spendingData.expenses.push(response.data)
  } catch (error) {
    console.error("Error adding spending:", error)
  }
}

export async function addIncome(newIncome) {
  try {
    const response = await api.post("/api/transactions", {
      description: newIncome.description,
      amount: newIncome.amount,
      date: newIncome.date,
      category: newIncome.category,
      isIncome: true
    })
    incomeData.incomes.push(response.data)
  } catch (error) {
    console.error("Error adding income:", error)
  }
}

export async function addSaving(newSaving) {
  try {
    const response = await api.post("/api/accounts", {
      amount: newSaving.amount,
      isChecking: false
    })
    savingsData.SavingsAmount.push(response.data)
  } catch (error) {
    console.error("Error adding saving:", error)
  }
}

export async function addChecking(newChecking) {
  try {
    const response = await api.post("/api/accounts", {
      amount: newChecking.amount,
      isChecking: true
    })
    checkingData.CheckingAmount.push(response.data)
  } catch (error) {
    console.error("Error adding checking:", error)
  }
}

export async function updateTransaction(updatedTransaction) {
  try {
    const response = await api.put(`/api/transactions/${updatedTransaction.id}`, {
      id: updatedTransaction.id,
      description: updatedTransaction.description,
      amount: updatedTransaction.amount,
      date: updatedTransaction.date,
      category: updatedTransaction.category,
      isIncome: updatedTransaction.isIncome
    })
    if (updatedTransaction.isIncome) {
      const index = incomeData.incomes.findIndex(
        (t) => t.id === updatedTransaction.id
      )
      if (index !== -1) incomeData.incomes[index] = response.data
    } else {
      const index = spendingData.expenses.findIndex(
        (t) => t.id === updatedTransaction.id
      )
      if (index !== -1) spendingData.expenses[index] = response.data
    }
  } catch (error) {
    console.error("Error updating transaction:", error)
  }
}

export async function deleteTransaction(transactionId) {
  try {
    await api.delete(`/api/transactions/${transactionId}`)
    spendingData.expenses = spendingData.expenses.filter(
      (t) => t.id !== transactionId
    )
    incomeData.incomes = incomeData.incomes.filter(
      (t) => t.id !== transactionId
    )
  } catch (error) {
    console.error("Error deleting transaction:", error)
  }
}

export async function importData(csvData) {
  try {
    const response = await api.post("/api/import", csvData)
    if (!response.ok) {
      throw new Error(`Import failed: ${response.statusText}`)
    }
    console.log("Data imported successfully!")
  } catch (error) {
    console.error("Error importing data:", error)
  }
}

export const refreshData = async () => {
  await loadSpendingData()
  await loadIncomeData()
}

loadSavingsData()
loadCheckingData()
loadSpendingData()
loadIncomeData()
loadTransferData()
