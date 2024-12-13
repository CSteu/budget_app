<template>
  <div class="card">
    <div class="header">
      <div class="header-left">
        <h4 id="currentMonth">Monthly Savings</h4>
        <h1>{{ formatCurrency(monthlySaving) }}</h1>
        <h3>Earned: {{ formatCurrency(moneyEarned) }} | Spent: {{ formatCurrency(moneySpent) }}</h3>
      </div>
    </div>
    <Chart type="bar" :data="chartData" :options="chartOptions" class="h-chart" />
  </div>
</template>

<script>
import Chart from "primevue/chart";

export default {
  components: {
    Chart,
  },
  inject: ["spendingData", "incomeData"],
  data() {
    return {
      chartData: null,
      chartOptions: null,
      currentMonthKey: null,
    };
  },
  computed: {
    expenses() {
      return Array.isArray(this.spendingData?.expenses)
        ? this.spendingData.expenses
        : [];
    },
    incomes() {
      return Array.isArray(this.incomeData?.incomes)
        ? this.incomeData.incomes
        : [];
    },
    transactions() {
      return [...this.expenses, ...this.incomes];
    },
    moneyEarned() {
      const currentMonthData = this.groupDataByMonth()[this.currentMonthKey] || { income: 0 };
      return this.roundToTwoDecimals(currentMonthData.income);
    },
    moneySpent() {
      const currentMonthData = this.groupDataByMonth()[this.currentMonthKey] || { expense: 0 };
      return this.roundToTwoDecimals(currentMonthData.expense);
    },
    monthlySaving() {
      return this.roundToTwoDecimals(this.moneyEarned - this.moneySpent);
    },
  },
  methods: {
    formatDateToMonth(date) {
      const current = new Date(date);
      return `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, "0")}`;
    },
    getMonthAbbreviation(date) {
      const current = new Date(date);
      return current.toLocaleString('en-US', { month: 'short' });
    },
    formatCurrency(value) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    },
    roundToTwoDecimals(value) {
      return Math.round((value + Number.EPSILON) * 100) / 100;
    },
    groupDataByMonth() {
      const now = new Date();
      const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());

      const groupedData = {};
      this.transactions.forEach((entry) => {
        const entryDate = new Date(entry.date);
        if (entryDate >= oneYearAgo) {
          const key = this.formatDateToMonth(entry.date);
          if (!groupedData[key]) groupedData[key] = { income: 0, expense: 0 };

          if (this.incomes.some((income) => income === entry)) {
            groupedData[key].income += entry.amount;
          } else {
            groupedData[key].expense += entry.amount;
          }
        }
      });

      return Object.keys(groupedData)
        .sort((a, b) => new Date(a) - new Date(b))
        .reduce((sortedData, key) => {
          sortedData[key] = groupedData[key];
          return sortedData;
        }, {});
    },
    setChartData() {
      const groupedData = this.groupDataByMonth();
      const labels = Object.keys(groupedData).map(date => this.getMonthAbbreviation(date));

      // Round each income and expense to two decimals
      const incomeData = Object.keys(groupedData).map(label => this.roundToTwoDecimals(groupedData[label].income));
      const expenseData = Object.keys(groupedData).map(label => this.roundToTwoDecimals(groupedData[label].expense));

      const now = new Date();
      this.currentMonthKey = this.formatDateToMonth(now);

      return {
        labels,
        datasets: [
          {
            label: "Income",
            backgroundColor: Object.keys(groupedData).map(label => label === this.currentMonthKey ? "#00b4d8" : "rgb(220, 218, 215)"),
            borderColor: "#0096c7",
            borderRadius: 5,
            hoverBackgroundColor: "#00b4d8",
            data: incomeData,
          },
          {
            label: "Expense",
            backgroundColor: Object.keys(groupedData).map(label => label === this.currentMonthKey ? "#0077b6" : "rgb(180, 178, 175)"),
            borderColor: "#023e8a",
            borderRadius: 5,
            hoverBackgroundColor: "#0077b6",
            data: expenseData,
          },
        ],
      };
    },
    setChartOptions() {
      return {
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              title: (tooltipItems) => {
                const label = tooltipItems[0].label;
                return label;
              },
              label: (tooltipItem) => {
                const datasetLabel = tooltipItem.dataset.label;
                const value = tooltipItem.raw;
                return `${datasetLabel}: $${value}`;
              },
              footer: (tooltipItems) => {
                const incomeItem = tooltipItems.find(t => t.datasetIndex === 0);
                const expenseItem = tooltipItems.find(t => t.datasetIndex === 1);
                if (incomeItem && expenseItem) {
                  const incomeVal = incomeItem.raw;
                  const expenseVal = expenseItem.raw;
                  const net = (incomeVal - expenseVal).toFixed(2);
                  return `Net Savings: $${net}`;
                }
                return '';
              }
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: "rgb(100, 100, 100)",
            },
            grid: {
              color: "rgba(136, 136, 136, 0.2)",
              display: true,
            },
          },
          y: {
            ticks: {
              color: "rgb(100, 100, 100)",
            },
            grid: {
              color: "rgba(136, 136, 136, 0.2)",
            },
          },
        },
      };
    },
    updateChart() {
      this.chartData = this.setChartData();
      this.chartOptions = this.setChartOptions();
    },
  },
  watch: {
    "spendingData.expenses": {
      handler() {
        this.updateChart();
      },
      deep: true,
    },
    "incomeData.incomes": {
      handler() {
        this.updateChart();
      },
      deep: true,
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
