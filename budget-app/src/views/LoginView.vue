<template>
    <div class="auth-container">
      <h2>{{ isLoginMode ? 'Secured Login' : 'Registration' }}</h2>
      <form @submit.prevent="onSubmit" class="form">
        <div class="form-field">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="credentials.email"
            type="email"
            required
            class="input-field"
            placeholder="Enter your email"
          />
        </div>
  
        <div class="form-field">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="credentials.password"
            type="password"
            required
            class="input-field"
            placeholder="Enter your password"
          />
        </div>
  
        <!-- Confirm Password Field for Registration -->
        <div v-if="!isLoginMode" class="form-field">
          <label for="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            required
            class="input-field"
            placeholder="Confirm your password"
          />
        </div>
  
        <div class="form-actions">
          <button type="submit" class="submit-button">
            {{ isLoginMode ? 'Login' : 'Register' }}
          </button>
        </div>
      </form>
  
      <p class="mode-toggle">
        <span v-if="isLoginMode">
          Don't have an account? 
          <a href="#" @click.prevent="toggleMode">Register here</a>
        </span>
        <span v-else>
          Already have an account? 
          <a href="#" @click.prevent="toggleMode">Login here</a>
        </span>
      </p>
    </div>
  </template>
  
  <script>
  import api from "@/api/axios";
  
  export default {
    name: "AuthPage",
    data() {
      return {
        isLoginMode: true,
        credentials: {
          username: "",
          email: "",
          password: "",
        },
        confirmPassword: "", // Added field for confirming password
      };
    },
    methods: {
      toggleMode() {
        this.isLoginMode = !this.isLoginMode;
        // Clear credentials and confirmPassword when toggling
        this.credentials = { username: "", email: "", password: "" };
        this.confirmPassword = "";
      },
      async onSubmit() {
        try {
          if (this.isLoginMode) {
            await this.loginUser();
          } else {
            // Check if passwords match
            if (this.credentials.password !== this.confirmPassword) {
              alert("Passwords do not match. Please try again.");
              return;
            }
            await this.registerUser();
          }
        } catch (error) {
          console.error(
            `${this.isLoginMode ? "Login" : "Registration"} failed`,
            error.response?.data
          );
          alert(`${this.isLoginMode ? "Login" : "Registration"} failed`);
        }
      },
      async loginUser() {
        const response = await api.post("/login", {
          email: this.credentials.email,
          password: this.credentials.password,
        });
        localStorage.setItem("authToken", response.data.accessToken);
        this.$router.push("/");
      },
      async registerUser() {
        const response = await api.post("/register", {
          username: this.credentials.username,
          email: this.credentials.email,
          password: this.credentials.password,
        });
        alert("Registration successful!");
        this.toggleMode(); // Switch to login mode after successful registration
      },
    },
  };
  </script>
  
  <style scoped>
  .auth-container {
    max-width: 400px;
    margin: 50px auto;
    background-color: #ffffff;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #2c3e50;
  }
  
  .form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .form-field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .form-field label {
    font-weight: bold;
    color: rgb(0, 162, 199);
  }
  
  .input-field {
    background-color: white !important;
    color: black !important;
    border: 1px solid rgb(0, 162, 199) !important;
    border-radius: 8px !important;
    padding: 0.5rem !important;
    width: 100% !important;
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
  
  .submit-button {
    background-color: rgb(0, 162, 199);
    border: none;
    color: white;
    font-weight: bold;
    border-radius: 8px;
    padding: 0.7rem 1.5rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 100%;
  }
  
  .submit-button:hover {
    background-color: #023e8a;
  }
  
  .mode-toggle {
    text-align: center;
    margin-top: 1rem;
  }
  
  .mode-toggle a {
    color: rgb(0, 162, 199);
    text-decoration: underline;
    cursor: pointer;
  }
  </style>
  