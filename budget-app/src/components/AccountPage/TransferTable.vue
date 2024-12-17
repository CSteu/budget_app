<template>
    <div class="transfer-tracker">
      <h1>Transfer History</h1>
      <div class="content">
        <div class="transfer-table-container">
          <DataTable
            :value="formattedTransfers"
            :paginator="true"
            :rows="8"
            responsiveLayout="scroll"
            class="transfer-table"
          >
            <Column field="date" header="Date">
              <template #body="slotProps">
                <span class="date-cell">{{ slotProps.data.formattedDate }}</span>
              </template>
            </Column>
            <Column field="sendingAccountName" header="From Account"></Column>
            <Column field="receivingAccountName" header="To Account"></Column>
            <Column field="amount" header="Amount">
              <template #body="slotProps">
                <span class="amount-cell">{{ formatCurrency(slotProps.data.amount) }}</span>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import DataTable from "primevue/datatable";
  import Column from "primevue/column";
  
  export default {
    components: {
      DataTable,
      Column,
    },
    inject: ["transferData", "checkingData", "savingsData"],
    data() {
      return {
        formattedTransfers: [],
      };
    },
    computed: {
      transfers() {
        return Array.isArray(this.transferData?.transfers) ? this.transferData.transfers : [];
      },
    },
    methods: {
      formatCurrency(value) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
      },
      formatDateToMonth(dateStr) {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${year}-${month}`;
      },
      updateFormattedTransfers() {
        this.formattedTransfers = this.transfers.map(transfer => {
          const sendingAccountName = this.getAccountName(transfer.sendingAccountId);
          const receivingAccountName = this.getAccountName(transfer.recievingAccountId);
          return {
            ...transfer,
            formattedDate: this.formatDate(transfer.date),
            sendingAccountName: sendingAccountName,
            receivingAccountName: receivingAccountName,
          };
        });
  
        this.formattedTransfers.sort((a, b) => new Date(b.date) - new Date(a.date));
      },
      formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });
      },
      getAccountName(accountId) {
        if (!this.checkingData && !this.savingsData) return `Account #${accountId}`;
        
        const checkingAccount = this.checkingData?.CheckingAmount?.find(account => account.id === accountId);
        const savingsAccount = this.savingsData?.SavingsAmount?.find(account => account.id === accountId);

        if (checkingAccount) {
          return checkingAccount.name || `Checking Account #${accountId}`;
        }
        if (savingsAccount) {
          return savingsAccount.name || `Savings Account #${accountId}`;
        }
        
        return `Account #${accountId}`;
      },
    },
    watch: {
      "transferData.transfers": {
        handler() {
          this.updateFormattedTransfers();
        },
        deep: true,
      },
      "checkingData.checkingAmount": {
        handler() {
          this.updateFormattedTransfers();
        },
        deep: true,
      },
      "savingsData.SavingsAmount": {
        handler() {
          this.updateFormattedTransfers();
        },
        deep: true,
      },
    },
    mounted() {
      this.updateFormattedTransfers();
    },
  };
  </script>
  
  <style scoped>
  .transfer-tracker {
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
  }
  
  .transfer-table-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 200px;
  }
  
  .transfer-table .p-datatable {
    border: none;
  }
  
  .transfer-table .p-datatable-header {
    display: none;
  }
  
  .transfer-table .p-datatable-thead > tr > th {
    color: var(--vt-c-text-dark-2);
    font-weight: 600;
    text-align: left;
    font-size: 0.9rem;
  }
  
  .transfer-table .p-datatable-tbody > tr > td {
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
  
  .transfer-table {
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
    background-color: rgb(0, 162, 199) !important;
    color: #ffffff !important;
  }
  
  .p-paginator .p-paginator-page:hover {
    background-color: #dcdedf !important;
    color: rgb(0, 162, 199) !important;
  }
  
  .p-datatable-paginator-bottom {
    border-style: none !important;
  }
  
  .date-cell {
    color: var(--vt-c-text-dark-2);
  }
  
  .amount-cell {
    display: block;
    text-align: left;
  }
  </style>
  