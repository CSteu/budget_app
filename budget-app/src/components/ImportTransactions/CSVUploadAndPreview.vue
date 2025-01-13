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
        </div>
        <DataTable
          :value="csvData"
          :paginator="true"
          :rows="8"
          responsiveLayout="scroll"
          class="expense-table"
          style="margin-top: 1rem;"
        >
          <Column field="Date" header="Date" />
          <Column field="Description" header="Description" />
          <Column field="Type" header="Type" />
          <Column field="Amount" header="Amount" />
          <Column field="Current balance" header="Current balance" />
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import Papa from "papaparse";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default {
  name: "CsvUploadAndPreview",
  components: {
    DataTable,
    Column,
  },
  data() {
    return {
      csvData: [],
    };
  },
  methods: {
    onFileSelect(event) {
      const file = event.target.files[0];
      if (!file) return;
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          this.csvData = results.data.filter((row) =>
            ["Debit Card", "Direct Payment", "Deposit", "Direct Deposit"].includes(row.Type)
          );
        },
        error: (err) => {
          console.error(err);
        },
      });
    },
  },
};
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
  