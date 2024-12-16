<template>
    <div class="card">
        <div class="header">
            <div class="header-left">
                <h4 id="currentMonth">Savings Account</h4>
                <h1>{{ formatCurrency(SavingsAmount) }}</h1>
            </div>
        </div>
    </div>
</template>

<script>
import Chart from "primevue/chart";

export default {
components: {
    Chart,
},
inject: ["savingsData"],
data() {
    return {
    chartData: null,
    chartOptions: null,
    currentMonthKey: null, 
    };
},
methods: {
    formatCurrency(value) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    },
    
    updateChart() {
    this.chartData = this.setChartData();
    this.chartOptions = this.setChartOptions();
    },
},
mounted() {
    this.updateChart();
},
};
</script>

<style scoped>
.card {
width: 100%;
margin: 1rem auto;
background-color: #ffffff;
padding: 2rem;
border-radius: 16px;
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.header {
display: flex;
justify-content: space-between;
}

.header-left {
display: flex;
flex-direction: column;
align-items: flex-start;
}

.header h1 {
font-size: 2rem;
margin: 0;
}

.header h2 {
    font-size: 1.1rem;
    margin: 0;
    color: cadetblue;
}

.header h3 {
color: #9b9b9b;
font-size: 1rem;
margin-bottom: .5rem;
}

.header h4 {
color: var(--vt-c-text-dark-2);
font-weight: 600;
}

.edit-budget-btn {
padding: 0.5rem 1rem;
background-color: #ffffff;
color: rgb(0, 162, 199);
border: none;
border-radius: 8px;
cursor: pointer;
font-weight: bold;
font-size: 1rem;
transition: background-color 0.3s ease;
align-self: flex-start;
}

.edit-budget-btn:hover {
color: rgb(1, 137, 168);
}

.h-chart {
height: 16rem;
width: 90%;
margin: 0 auto;
}
</style>
