import { reactive } from 'vue';
import axios from 'axios';

const apiBaseUrl = "https://localhost:5001/api";

const loadSavingsFromAPI = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/accounts`);
    return response.data.filter(accounts => !accounts.isChecking);
  } catch (error) {
    console.error('Error loading savings data from API:', error);
    return [];
  }
};

export const savingsData = reactive({
  SavingsAmount: []
});

export const loadSavingsData = async () => {
  savingsData.SavingsAmount = await loadSavingsFromAPI();
};

loadSavingsData();

const loadCheckingFromAPI = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/accounts`);
    return response.data.filter(accounts => accounts.isChecking);
  } catch (error) {
    console.error('Error loading checking data from API:', error);
    return [];
  }
};

export const checkingData = reactive({
  CheckingAmount: []
});

export const loadCheckingData = async () => {
  checkingData.CheckingAmount = await loadCheckingFromAPI();
};

loadCheckingData();

// Load spending data from the API
const loadSpendingFromAPI = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/transactions`);
    return response.data.filter(transaction => !transaction.isIncome);
  } catch (error) {
    console.error('Error loading spending data from API:', error);
    return [];
  }
};

export const spendingData = reactive({
  expenses: []
});

export const loadSpendingData = async () => {
  spendingData.expenses = await loadSpendingFromAPI();
};

loadSpendingData();

// Load income data from the API
const loadIncomeFromAPI = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/transactions`);
    return response.data.filter(transaction => transaction.isIncome);
  } catch (error) {
    console.error('Error loading income data from API:', error);
    return [];
  }
};

export const incomeData = reactive({
  incomes: []
});

export const loadIncomeData = async () => {
  incomeData.incomes = await loadIncomeFromAPI();
};

loadIncomeData();

const loadTransfersFromAPI = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/Transfers`);
    return response.data;
  } catch (error) {
    console.error('Error loading transfers data from API:', error);
    return [];
  }
};

export const transferData = reactive({
  transfers: []
});

export const loadTransferData = async () => {
  transferData.transfers = await loadTransfersFromAPI();
};

loadIncomeData();

// Post new spending data to the API
export const addSpending = async (newSpending) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/transactions`, {
      description: newSpending.description,
      amount: newSpending.amount,
      date: newSpending.date,
      category: newSpending.category,
      isIncome: false
    });
    spendingData.expenses.push(response.data);
  } catch (error) {
    console.error('Error adding new spending to API:', error);
  }
};

// Post new income data to the API
export const addIncome = async (newIncome) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/transactions`, {
      description: newIncome.description,
      amount: newIncome.amount,
      date: newIncome.date,
      category: newIncome.category,
      isIncome: true
    });
    incomeData.incomes.push(response.data);
  } catch (error) {
    console.error('Error adding new income to API:', error);
  }
};

export const addSaving = async (newSaving) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/accounts`, {
      amount: newSaving.amount,
      isChecking: false
    });
    savingsData.SavingsAmount = response.data;
  } catch (error) {
    console.error('Error adding new savings to API:', error);
  }
};

export const addChecking = async (newChecking) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/accounts`, {
      amount: newChecking.amount,
      isChecking: true
    });
    checkingData.CheckingAmount = response.data;
  } catch (error) {
    console.error('Error adding new checking to API:', error);
  }
};