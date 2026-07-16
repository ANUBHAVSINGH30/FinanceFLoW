# 💰 FinanceFloW Backend

Backend API for **FinanceFloW**, a personal finance management application built with **Node.js, Express, TypeScript, PostgreSQL, and Prisma**.

It provides secure authentication, transaction management, budget tracking, and dynamic budget analytics.

---

##  Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Zod Validation
- bcrypt

---

## ✨ Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes

### Transactions
- Create Transaction
- View Transactions
- Get Transaction by ID
- Update Transaction
- Delete Transaction
- Search Transactions
- Filter by Category
- Filter by Type
- Filter by Date Range
- Sorting
- Pagination

### Budgets
- Create Monthly Budget
- Update Budget
- Delete Budget
- View Budget
- Prevent Duplicate Budgets
- Dynamic Budget Tracking
- Remaining Budget Calculation
- Percentage Used
- Budget Status
  - Within Budget
  - Near Limit
  - Over Budget

---

## 📂 Project Structure

```text
src/
│
├── config/
├── controllers/
├── middleware/
├── routes/
├── services/
├── validators/
├── constants/
├── utils/
└── server.ts

prisma/
├── migrations/
└── schema.prisma
```

---

## ⚙️ Installation

Clone the repository

```bash
git clone <repository-url>
```

Move into the project

```bash
cd financeflow-backend
```

Install dependencies

```bash
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file.

```env
DATABASE_URL=your_postgresql_database_url

JWT_SECRET=your_jwt_secret

PORT=3000
```

---

## 🗄️ Database

Run migrations

```bash
npx prisma migrate dev
```

Generate Prisma Client

```bash
npx prisma generate
```

(Optional)

```bash
npx prisma studio
```

---

## ▶️ Run the Server

Development

```bash
npm run dev
```

Production

```bash
npm run build

npm start
```

---

# API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | `/api/auth/signup` |
| POST | `/api/auth/login` |

---

## Transactions

| Method | Endpoint |
|---------|----------|
| POST | `/api/transactions` |
| GET | `/api/transactions` |
| GET | `/api/transactions/:id` |
| PUT | `/api/transactions/:id` |
| DELETE | `/api/transactions/:id` |

Supports:

- Pagination
- Search
- Category Filter
- Type Filter
- Date Range Filter
- Sorting

---

## Budgets

| Method | Endpoint |
|---------|----------|
| POST | `/api/budgets` |
| GET | `/api/budgets` |
| GET | `/api/budgets/:id` |
| PUT | `/api/budgets/:id` |
| DELETE | `/api/budgets/:id` |

Budget responses include:

- Budget Amount
- Amount Spent
- Remaining Budget
- Percentage Used
- Budget Status

---

## 🔒 Authentication

All transaction and budget routes require a JWT Bearer Token.

Example

```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 📌 Future Improvements

- Dashboard Analytics
- Recurring Transactions
- Savings Goals
- Multi-Currency Support
- Email Notifications
- Export to CSV/PDF
- Google Authentication

---

## 👨‍💻 Author

Built by **Anubhav Singh**

FinanceFloW is a personal finance tracker built to manage day-to-day expenses and budgets while serving as a full-stack learning project.