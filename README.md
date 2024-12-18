# Spending Insights App

## Table of Contents
- [Overview](#overview)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)

---

## Overview
The Spending Insights App is a budgeting and financial tracking tool that helps users analyze and manage their expenses. It features a Vue.js frontend and a .NET 9 backend to provide a smooth, interactive user experience and a robust server-side API.

## Project Structure
```
root/
├── budget-app/      # Vue.js frontend
└── backend/         # .NET 9 backend
```

### Key Directories and Files
- **budget_app/budget-app**: Contains the Vue.js frontend source code.
- **backend**: Contains the .NET 9 API backend code.

---

## Technologies Used

### Frontend
- **Vue.js**: Progressive JavaScript framework for building user interfaces.
- **HTML/CSS/JavaScript**: Standard web development technologies.

### Backend
- **.NET 9**: Cross-platform development framework used to create the API backend.
- **C#**: Main programming language used in the .NET backend.

---

## Setup Instructions

### Prerequisites
- **Node.js**: Required to run the Vue frontend. [Download and install Node.js](https://nodejs.org/)
- **.NET SDK 9**: Required to build and run the .NET backend. [Download and install .NET SDK 9](https://dotnet.microsoft.com/)

---

## Backend Setup
1. **Navigate to the backend directory**:
   ```bash
   cd BudgetApi
   ```

2. **Restore dependencies**:
   ```bash
   dotnet restore
   ```

3. **Build the application**:
   ```bash
   dotnet build
   ```

4. **Run the backend**:
   ```bash
   dotnet run
   ```

By default, the backend will be accessible at `https://localhost:5001/`.

---

## Frontend Setup
1. **Navigate to the frontend directory**:
   ```bash
   cd budget_app/budget-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the frontend**:
   ```bash
   npm run dev
   ```

By default, the frontend will be accessible at `http://localhost:5173/`.

---

## Running the Application
To run both the backend and frontend simultaneously, follow these steps:

1. **Run the backend**:
   ```bash
   cd BudgetApi
   dotnet run
   ```

2. **Run the frontend**:
   ```bash
   cd budget_app/budget-app
   npm run dev
   ```

You can now access the Spending Insights app at `http://localhost:5173/`.

---


