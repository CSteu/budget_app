<template>
  <div class="kanye-quote">
    <h2>Kanye Quote of the Day</h2>
    <div class="quote-container">
      <div v-if="state.quote">
        <p class="quote-text">"{{ state.quote }}"</p>
      </div>
      <div v-else>
        <p class="loading-text">Loading Kanye's wisdom...</p>
      </div>
    </div>
    <button class="refresh-btn" @click="fetchQuote">Get Another Quote</button>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';

const state = reactive({
  quote: null
});

const fetchQuote = async () => {
  try {
    const response = await fetch('https://api.kanye.rest/');
    const data = await response.json();
    state.quote = data.quote;
  } catch (error) {
    state.quote = 'Failed to load quote. Please try again.';
  }
};

onMounted(() => {
  fetchQuote();
});
</script>

<style scoped>
.kanye-quote {
  max-width: 600px;
  margin: 1rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

h2 {
  font-weight: 600;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 1.5rem;
}

.quote-container {
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.quote-text {
  font-size: 1.25rem;
  font-weight: 500;
  color: #333;
  text-align: center;
  font-style: italic;
}

.loading-text {
  font-size: 1rem;
  font-weight: 400;
  color: #888;
  text-align: center;
}

.refresh-btn {
  display: block;
  width: 100%;
  padding: 0.75rem;
  margin-top: 1.5rem;
  background-color: #00b4d8;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1rem;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.refresh-btn:hover {
  background-color: #0077b6;
}

</style>
