# Expense Tracker Backend

Welcome to the **Expense Tracker Backend**, a robust and scalable RESTful API designed to manage users, budgets, and transactions. Built with the MERN stack in mind, this backend serves as the foundation for an efficient expense-tracking application.

---

## **Tech Stack**

Here’s the technology stack used to power this backend:

- **Node.js**: Runtime environment for executing JavaScript server-side.
- **Express.js**: Lightweight framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing user, budget, and transaction data.
- **Mongoose**: ODM library for MongoDB, enabling schema-based modeling.
- **UUID**: For generating unique IDs for users and budgets.
- **bcrypt**: Password hashing for secure user authentication.
- **jsonwebtoken (JWT)**: For user authentication and session management.
- **dotenv**: Securely manage environment variables.

---

## ⚙️ **Schema Overview**

### 1. **User Schema**
- **Fields**:
  - `userId` (string): A unique identifier for each user.
  - `name` (string): User’s name.
  - `email` (string): User’s email (unique).
  - `password` (string): Hashed password for authentication.
  - `budgets` (array): A list of budget categories and limits.
  
### 2. **Budget Schema**
- **Fields**:
  - `budgetId` (string): Unique identifier for the budget.
  - `category` (string): Name of the category (e.g., Food, Travel).
  - `amount` (number): Budget limit for the category.
  - `threshold` (number): Notification threshold percentage (e.g., 80%).

### 3. **Transaction Schema**
- **Fields**:
  - `userId` (string): Reference to the user making the transaction.
  - `amount` (number): Amount spent or added.
  - `type` (string): Either `income` or `expense`.
  - `description` (string): Description of the transaction.
  - `category` (string): Associated budget category.
  - `date` (date): Date of the transaction.

---

## 🚀 **How It Works**

The backend provides a structured way to:
1. **Register and Login Users**:
   - Secure user authentication with JWT.
   - Passwords are securely hashed using bcrypt.

2. **Manage Budgets**:
   - Users can add, update, or delete budget categories.
   - Tracks limits and ensures transactions stay within budget.

3. **Track Transactions**:
   - Users can add income or expenses linked to a category.
   - Ensures expense transactions don’t exceed budget limits.

4. **Data Validation**:
   - Validates inputs like date, category, and transaction types.
   - Ensures smooth data flow and prevents errors.

---

## 🛠️ **Setup Instructions**

Follow these steps to set up and run the project locally:

### 1. **Clone the Repository**
```bash
git clone https://github.com/YashwantSaste/expense-tracker-backend
cd expense-tracker-backend
```

### 2. **Install Dependencies**
```bash
npm install
```

### 3. **Set Up Environment Variables**
Create a `.env` file in the root directory and add the following variables:
```env
PORT=4000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_secret_key>
```


