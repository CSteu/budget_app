import { reactive } from "vue";
import api from "@/api/axios";

// Savings Data
export const savingsData = reactive({
  SavingsAmount: [],
});

async function loadSavingsFromAPI() {
  try {
    const response = await api.get("/api/accounts");
    return response.data.filter((account) => !account.isChecking);
  } catch (error) {
    console.error("Error loading savings:", error);
    return [];
  }
}

export async function loadSavingsData() {
  savingsData.SavingsAmount = await loadSavingsFromAPI();
}

// Checking Data
export const checkingData = reactive({
  CheckingAmount: [],
});

async function loadCheckingFromAPI() {
  try {
    const response = await api.get("/api/accounts");
    return response.data.filter((account) => account.isChecking);
  } catch (error) {
    console.error("Error loading checking:", error);
    return [];
  }
}

export async function loadCheckingData() {
  checkingData.CheckingAmount = await loadCheckingFromAPI();
}

// Combined Transaction Data (Income + Spending)
export const transactionData = reactive({
  transactions: [],
});

async function loadTransactionsFromAPI() {
  try {
    const response = await api.get("/api/transactions");
    return response.data;
  } catch (error) {
    console.error("Error loading transactions:", error);
    return [];
  }
}

export async function loadTransactionData() {
  transactionData.transactions = await loadTransactionsFromAPI();
}

// Transfer Data
export const transferData = reactive({
  transfers: [],
});

async function loadTransfersFromAPI() {
  try {
    const response = await api.get("/api/transfers");
    return response.data;
  } catch (error) {
    console.error("Error loading transfers:", error);
    return [];
  }
}

export async function loadTransferData() {
  transferData.transfers = await loadTransfersFromAPI();
}

// Add New Transaction
export async function addTransaction(newTransaction) {
  try {
    const response = await api.post("/api/transactions", newTransaction);
    transactionData.transactions.push(response.data);
  } catch (error) {
    console.error("Error adding transaction:", error);
  }
}

// Update Transaction
export async function updateTransaction(updatedTransaction) {
  try {
    const response = await api.put(
      `/api/transactions/${updatedTransaction.id}`,
      updatedTransaction
    );
    const index = transactionData.transactions.findIndex(
      (t) => t.id === updatedTransaction.id
    );
    if (index !== -1) transactionData.transactions[index] = response.data;
  } catch (error) {
    console.error("Error updating transaction:", error);
  }
}

// Delete Transaction
export async function deleteTransaction(transactionId) {
  try {
    await api.delete(`/api/transactions/${transactionId}`);
    transactionData.transactions = transactionData.transactions.filter(
      (t) => t.id !== transactionId
    );
  } catch (error) {
    console.error("Error deleting transaction:", error);
  }
}

// Refresh All Data
export async function refreshData() {
  await loadSavingsData();
  await loadCheckingData();
  await loadTransactionData();
  await loadTransferData();
}

// Initial Load
loadSavingsData();
loadCheckingData();
loadTransactionData();
loadTransferData();
