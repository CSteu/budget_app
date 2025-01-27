<template>
  <div class="expense-tracker">
    <h1>SoFi CSV Upload</h1>
    <div class="content">
      <div class="expense-table-container">
        <div class="file-upload-wrapper">
          <label for="file-upload" class="file-upload-label">
            Choose CSV File
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".csv"
            @change="onFileSelect"
          />
          <Button
            label="Import to Database"
            id="upload-import-button"
            style="margin-top: 1rem;"
            :disabled="!canImport || isLoading"
            @click="callImportData"
          />
        </div>
        <DataTable
          :value="csvData"
          :paginator="true"
          :rows="8"
          responsiveLayout="scroll"
          class="expense-table"
          style="margin-top: 1rem;"
        >
          <Column field="date" header="Date" />
          <Column field="description" header="Description" />
          <Column field="type" header="Type" />
          <Column field="amount" header="Amount" />
          <Column field="currentBalance" header="Current Balance" />
          <Column field="isIncome" header="Is Income?" />
           <Column field="category" header="Category" />
        </DataTable>
      </div>
    </div>
    <Toast v-if="message" :severity="messageSeverity" :summary="messageSummary" :detail="messageDetail" @hide="message = null" />
  </div>
</template>

<script>
import Papa from "papaparse"
import api from "@/api/axios"
import DataTable from "primevue/datatable"
import Column from "primevue/column"
import Button from "primevue/button"
import Toast from "primevue/toast"

export default {
  name: "CsvUploadAndImport",
  components: {
    DataTable,
    Column,
    Button,
    Toast
  },
  data() {
    return {
      csvData: [],
      isLoading: false,
      message: null,
      messageSeverity: '',
      messageSummary: '',
      messageDetail: ''
    }
  },
  computed: {
    canImport() {
      return this.csvData && this.csvData.length > 0
    }
  },
  methods: {
    onFileSelect(event) {
      const file = event.target.files[0]
      if (!file) return

      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const mappedData = results.data.map(row => {
             let isIncome = false;
             let category = "";
             if(row.Type == "Direct Deposit" || row.Type == "Deposit")
            {
              isIncome = true;
              category = "Income";
            }
            return {
              date: row.Date,
              description: row.Description,
              type: row.Type,
              amount: parseFloat(row.Amount),
              currentBalance: parseFloat(row["Current balance"]),
              isIncome: isIncome,
              category: category,
            }
          }
          ).filter(row =>
            ["Debit Card", "Direct Payment", "Deposit", "Direct Deposit"].includes(row.type)
          )
          this.csvData = mappedData
        },
        error: (err) => {
          console.error(err)
          this.showMessage('error', 'Parsing Error', 'Failed to parse CSV file.')
        }
      })
    },
   async callImportData() {
      this.isLoading = true
      try {
         const formattedData = this.csvData.map(transaction => {
            let formattedDate = new Date(transaction.date)
            return {
                ...transaction,
                date: formattedDate.toISOString(),
            };
          });
          console.log(formattedData);
          const response = await api.post('/api/import', formattedData)
          this.showMessage('success', 'Import Successful', `${response.data.length} transactions imported.`)

        this.$router.push("/")
      } catch (error) {
        console.error(error)
        if (error.response) {
          this.showMessage('error', 'Import Failed', error.response.data || 'An error occurred during import.')
        } else if (error.request) {
          this.showMessage('error', 'Network Error', 'No response from the server.')
        } else {
          this.showMessage('error', 'Error', 'An unexpected error occurred.')
        }
      } finally {
        this.isLoading = false
      }
    },
    showMessage(severity, summary, detail) {
      this.messageSeverity = severity
      this.messageSummary = summary
      this.messageDetail = detail
      this.message = true
    }
  }
}
</script>

<style scoped>
.content {
  min-width: 65vw;
}
body {
  font-family: 'Poppins', sans-serif;
  background-color: #f0f2f5;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.expense-tracker {
  max-width: 1200px;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}
h1 {
  font-weight: 600;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 0.5rem;
}
.content {
  display: flex;
  gap: 2rem;
}
.expense-table-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 400px;
}
.expense-table .p-datatable {
  border: none;
}
.expense-table .p-datatable-header {
  display: none;
}
.expense-table .p-datatable-thead > tr > th {
  color: var(--vt-c-text-dark-2);
  font-weight: 600;
  text-align: left;
  font-size: 0.9rem;
}
.expense-table .p-datatable-tbody > tr > td {
  border: none;
  padding: 0.75rem 0;
  color: #34495e;
  text-align: left;
  height: 2.5rem;
}
.p-datatable-wrapper {
  display: flex;
  flex-direction: column;
  height: 26rem;
}
.expense-table {
  flex-grow: 1;
  overflow: hidden;
}
.p-paginator {
  flex-shrink: 0;
  margin-top: 1rem;
  background-color: #ffffff;
}
.p-paginator .p-paginator-pages .p-paginator-page {
  margin: 0 0.5rem;
}
.p-paginator .p-paginator-page {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background-color: #ecf0f1;
  color: rgb(0, 162, 199);
  transition: all 0.3s ease;
  font-weight: 500;
}
.p-paginator .p-paginator-page-selected {
  background-color: rgba(0, 162, 199, 0.8) !important;
  color: #ffffff !important;
}
.p-paginator .p-paginator-page:hover {
  background-color: #dcdedf !important;
  color: rgb(0, 162, 199) !important;
}
.p-datatable-paginator-bottom {
  border-style: none !important;
}
.p-datatable-table-container {
  min-height: 26rem;
}
.file-upload-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.file-upload-label {
  background-color: rgb(0, 162, 199);
  color: #ffffff;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  user-select: none;
}
.file-upload-label:hover {
  background-color: rgba(0, 162, 199, 0.8);
}
#file-upload {
  display: none;
}
#upload-import-button {
  background-color: rgb(0, 162, 199);
  color: #ffffff;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  user-select: none;
}
#upload-import-button:hover {
  background-color: rgba(0, 162, 199, 0.8);
}
#upload-import-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
  background-color: rgb(121, 228, 252);
}
</style>