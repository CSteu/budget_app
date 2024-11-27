import { reactive } from 'vue';

const loadFromLocalStorage = () => {
  const storedData = localStorage.getItem('spendingData');
  return storedData ? JSON.parse(storedData) : [];
};

export const spendingData = reactive({
  expenses: loadFromLocalStorage(),
});
