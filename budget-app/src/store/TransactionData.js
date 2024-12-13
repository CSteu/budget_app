import { reactive } from 'vue';
import axios from 'axios';

const apiBaseUrl = "https://localhost:5001/api";

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

