# 💰 Finance Dashboard

A modern, responsive **Financial Dashboard Web Application** built using **React (Vite)**.
It helps users track income, expenses, and financial insights with interactive UI and analytics.

---

## 🚀 Features

* 📊 Dashboard overview (Income, Expenses, Balance)
* 📈 Interactive charts (Bar & Doughnut)
* 💳 Transaction management (Add, Edit, Delete)
* 🔍 Filtering & Searching transactions
* 📅 Monthly analytics & insights
* 🌗 Dark / Light mode toggle
* 🔐 Role-based access (Admin / Viewer)
* 📤 Export transactions as CSV

---

## 🏗️ Project Structure

```
src/
│── assets/                # Static files (images, icons)
│
│── components/            # Reusable UI components
│   │── dashboard/         # Dashboard-specific components
│   │── layout/            # Layout components (Sidebar, Header)
│   │── transactions/      # Transaction-related UI
│   │── ui/                # Generic reusable UI (buttons, cards)
│
│── context/               # Global state management (React Context)
│
│── data/                  # Mock data & sample datasets
│
│── hooks/                 # Custom React hooks
│
│── pages/                 # Main pages (Dashboard, Transactions, Insights)
│
│── styles/                # Theme & styling files
│
│── utils/                 # Helper functions & constants
│
│── App.jsx                # Root component
│── main.jsx               # Entry point
│── index.css              # Global styles
│── App.css                # App-level styles
```

---

## 🧠 Folder Explanation (Detailed)

### 📁 components/

Reusable UI building blocks.

* **dashboard/** → Cards, charts, analytics widgets
* **layout/** → Sidebar, Header, Navigation
* **transactions/** → Transaction table, filters, rows
* **ui/** → Buttons, inputs, reusable design components

---

### 📁 context/

Handles **global state management**.

Used for:

* Theme (Dark/Light)
* User role (Admin/Viewer)
* Shared data across components

---

### 📁 data/

Contains:

* Mock transaction data
* Data generators for testing UI

---

### 📁 hooks/

Custom reusable logic using React hooks.

Examples:

* `useTransactions()` → handles filtering, sorting, totals
* `useTheme()` → manages dark/light mode

---

### 📁 pages/

Main screens of the app.

* **Dashboard.jsx** → Overview & charts
* **Transactions.jsx** → Full transaction table
* **Insights.jsx** → Financial analytics

---

### 📁 styles/

* Theme configuration
* Color palettes
* Global design system

---

### 📁 utils/

Helper logic.

Includes:

* Constants (colors, categories)
* Date formatting functions
* Calculation helpers

---

## ⚙️ Tech Stack

* ⚛️ React (Vite)
* 📊 Chart.js
* 🎨 CSS / Inline Styling
* 🧠 React Hooks & Context API

---

# Navigate into project
cd finance-dashboard

# Install dependencies
npm install

# Run development server
npm run dev
```

---

## 🧩 Core Functionalities

### 1. Transaction System

* Add new transactions
* Edit existing ones
* Delete (Admin only)

### 2. Analytics Engine

* Monthly income vs expenses
* Category-based spending breakdown
* Top spending category detection

### 3. Filtering & Sorting

* Filter by type (Income/Expense)
* Filter by category
* Search transactions
* Sort by date/amount

### 4. Export Feature

* Export all transactions into CSV format

---

## 🔐 Role-Based Access

| Role   | Permissions                   |
| ------ | ----------------------------- |
| Admin  | Full access (Add/Edit/Delete) |
| Viewer | Read-only access              |

---

## 🎨 UI Features

* Clean modern UI
* Responsive layout
* Dark mode support
* Smooth transitions

---

## 📈 Future Improvements

* 🔗 Backend integration (Node.js / Firebase)
* 🔐 Authentication system
* 📱 Mobile responsiveness improvements
* 📊 Advanced analytics (AI insights)
* 🌍 Multi-user support

---

## 🧑‍💻 Author

**Tanoo Sree**

---

## ⭐ Notes

This project demonstrates:

* Strong frontend architecture
* Component-based design
* State management skills
* Real-world dashboard implementation

---

## 📌 Conclusion

This Finance Dashboard is a **production-ready frontend project** showcasing:

* Clean code structure
* Scalable architecture
* Real-world financial tracking features

---
