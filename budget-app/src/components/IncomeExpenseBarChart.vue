<template>
  <div class="card">
    <div class="header">
      <div class="header-left">
        <h1>Income vs Expense</h1>
        <h3>Tracking your financial summary for the past year</h3>
      </div>
      <button class="edit-budget-btn">Edit Budget</button>
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
  },
  methods: {
    groupDataByMonth() {
      const formatDateToMonth = (date) => {
        const current = new Date(date);
        return `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, "0")}`;
      };

      const now = new Date();
      const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());

      const groupedData = {};
      this.transactions.forEach((entry) => {
        const entryDate = new Date(entry.date);
        if (entryDate >= oneYearAgo) {
          const key = formatDateToMonth(entry.date);
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
      const labels = Object.keys(groupedData);
      const incomeData = labels.map((label) => groupedData[label].income);
      const expenseData = labels.map((label) => groupedData[label].expense);
      console.log(incomeData);

      return {
        labels,
        datasets: [
          {
            label: "Income",
            backgroundColor: "#00b4d8",
            borderColor: "#0096c7",
            data: incomeData,
          },
          {
            label: "Expense",
            backgroundColor: "#0077b6",
            borderColor: "#023e8a",
            data: expenseData,
          },
        ],
      };
    },
    setChartOptions() {
      return {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: "#03045e",
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#023e8a",
            },
            grid: {
              display: false,
            },
          },
          y: {
            ticks: {
              color: "#023e8a",
            },
            grid: {
              color: "#0096c7",
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
  margin-bottom: 0.5rem;
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
  height: 20rem;
  width: 90%;
  margin: 0 auto;
}
</style>
