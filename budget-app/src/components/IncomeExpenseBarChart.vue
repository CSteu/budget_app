<template>
    <div class="card">
        <div class="header">
            <h1>Income vs Expense</h1>
        </div>
        <Chart type="bar" :data="chartData" :options="chartOptions" class="h-chart" />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Chart from "primevue/chart";

const chartData = ref();
const chartOptions = ref();

const expenses = ref([
    { date: "2024-11-19", description: "Groceries", category: "Food", amount: 45.67 },
    { date: "2024-11-18", description: "Gas", category: "Transport", amount: 25.34 },
    { date: "2024-11-17", description: "Movie Night", category: "Entertainment", amount: 15.0 },
    { date: "2024-10-25", description: "Coffee", category: "Food", amount: 5.25 },
    { date: "2024-10-15", description: "Monthly Rent", category: "Housing", amount: 1200.0 },
    { date: "2024-10-10", description: "Electricity Bill", category: "Utilities", amount: 85.5 },
    { date: "2024-09-29", description: "Gym Membership", category: "Health", amount: 40.0 },
    { date: "2024-09-20", description: "Car Repair", category: "Transport", amount: 300.0 },
    { date: "2024-09-05", description: "Insurance Payment", category: "Health", amount: 150.0 },
]);

const income = ref([
    { date: "2024-11-19", description: "Salary", amount: 2500.0 },
    { date: "2024-10-15", description: "Freelance Project", amount: 500.0 },
    { date: "2024-10-10", description: "Investment Dividend", amount: 200.0 },
    { date: "2024-09-25", description: "Gift", amount: 100.0 },
    { date: "2024-09-01", description: "Bonus", amount: 300.0 },
]);

onMounted(() => {
    updateChart();
});

const updateChart = () => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
};

const groupDataByMonth = () => {
    const formatDateToMonth = (date) => {
        const current = new Date(date);
        return `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, "0")}`;
    };

    const groupedData = {};
    [...expenses.value, ...income.value].forEach((entry) => {
        const key = formatDateToMonth(entry.date);
        if (!groupedData[key]) groupedData[key] = { income: 0, expense: 0 };

        if (income.value.includes(entry)) groupedData[key].income += entry.amount;
        else groupedData[key].expense += entry.amount;
    });

    return Object.keys(groupedData)
        .sort((a, b) => new Date(a) - new Date(b))
        .reduce((sortedData, key) => {
            sortedData[key] = groupedData[key];
            return sortedData;
        }, {});
};

const setChartData = () => {
    const groupedData = groupDataByMonth();
    const labels = Object.keys(groupedData);
    const incomeData = labels.map((label) => groupedData[label].income);
    const expenseData = labels.map((label) => groupedData[label].expense);

    const documentStyle = getComputedStyle(document.documentElement);
    return {
        labels,
        datasets: [
            {
                label: "Income",
                backgroundColor: documentStyle.getPropertyValue("--p-green-500"),
                borderColor: documentStyle.getPropertyValue("--p-green-500"),
                data: incomeData,
            },
            {
                label: "Expense",
                backgroundColor: documentStyle.getPropertyValue("--p-red-500"),
                borderColor: documentStyle.getPropertyValue("--p-red-500"),
                data: expenseData,
            },
        ],
    };
};

const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--p-text-color");
    const textColorSecondary = documentStyle.getPropertyValue("--p-text-muted-color");
    const surfaceBorder = documentStyle.getPropertyValue("--p-content-border-color");

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.5,
        plugins: {
            legend: {
                labels: {
                    color: textColor,
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500,
                    },
                },
                grid: {
                    display: false,
                    drawBorder: false,
                },
            },
            y: {
                ticks: {
                    color: textColorSecondary,
                    stepSize: 50,
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false,
                },
            },
        },
    };
};
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

.card {
    width: 95%;
    max-width: 1800px;
    margin: 2rem auto;
    background-color: #f0f2f5;
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.header h1 {
    font-size: 2rem;
    color: #333333;
    margin: 0;
}

.h-chart {
    height: 20rem;
    width: 45rem;
    margin: 2rem;
}
</style>
