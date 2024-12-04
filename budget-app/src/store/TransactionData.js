import { reactive } from 'vue'

const loadSpendingFromLocalStorage = () => {
  const storedData = localStorage.getItem('spendingData')
  return storedData ? JSON.parse(storedData) : []
}

export const spendingData = reactive({
  expenses: loadSpendingFromLocalStorage(),
})

const loadIncomeFromLocalStorage = () => {
  const storedData = localStorage.getItem('incomeData')
  return storedData ? JSON.parse(storedData) : []
}

export const incomeData = reactive({
  expenses: loadIncomeFromLocalStorage(),
})
