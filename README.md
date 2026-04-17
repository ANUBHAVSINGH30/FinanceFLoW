# FinanceFLoW

# 💰 Smart Finance Tracker

> A full-stack personal finance app to track 
> income, expenses, budgets and insights.
> Built after completing Cohort 2.0 🔥

## 🚧 Status: Planned — Starting [Month] 2026

---

## 🎯 Goal
Build a real, usable finance tracker — not just 
a portfolio showpiece. Something I actually use daily.

---

## ⚙️ Tech Stack
| Layer      | Technology              |
|------------|-------------------------|
| Frontend   | Next.js + Tailwind CSS  |
| State      | Zustand                 |
| Backend    | Node.js + Express       |
| Database   | PostgreSQL + Prisma     |
| Charts     | Recharts                |
| Auth       | JWT + bcrypt            |
| Deployment | Vercel + Railway        |

> Using PostgreSQL + Prisma instead of MongoDB
> because I'll know it properly after Cohort 2.0

---

## 🗄️ Database Design

### User
```json
{
  "id": "uuid",
  "email": "string",
  "password": "hashed"
}
```

### Transaction
```json
{
  "id": "uuid",
  "userId": "ref",
  "amount": "number",
  "type": "income | expense",
  "category": "string",
  "date": "datetime",
  "note": "string",
  "createdAt": "datetime"
}
```

### Budget
```json
{
  "id": "uuid",
  "userId": "ref",
  "category": "string",
  "month": "string",
  "limit": "number"
}
```

---

## 🌐 API Design

### Auth
- POST /auth/signup
- POST /auth/login

### Transactions
- GET    /transactions
- POST   /transaction
- PUT    /transaction/:id
- DELETE /transaction/:id

### Summary & Analytics
- GET /summary

### Budget
- GET  /budget
- POST /budget

---

## 🎨 Pages

### 1. Dashboard (Main)
- [ ] Total balance
- [ ] Income vs Expense chart
- [ ] Monthly spending chart
- [ ] Recent transactions

### 2. Transactions Page
- [ ] List all transactions
- [ ] Filter by date/category
- [ ] Search transactions
- [ ] Edit/Delete

### 3. Add Transaction
- [ ] Form with validation
- [ ] Category selector
- [ ] Date picker

### 4. Budget Page
- [ ] Set monthly limit per category
- [ ] Progress bar (spent vs limit)
- [ ] Alert when near limit

---

## 🔥 Features

### Must Have
- [ ] Add/Edit/Delete transaction
- [ ] Category system
- [ ] Dashboard with charts
- [ ] Filters and search
- [ ] JWT Authentication

### High Value
- [ ] Budget tracking per category
- [ ] Monthly summary
- [ ] Category-wise breakdown

### Bonus (pick 1-2)
- [ ] Spending insights
      "You spent 20% more this week"
- [ ] Recurring transactions
- [ ] Export data as CSV

---

## 📁 Folder Structure

### Frontend

src/
├── components/
├── pages/
├── store/        (Zustand)
├── services/     (API calls)
├── hooks/
└── utils/

### Backend
backend/
├── routes/
├── controllers/
├── models/
├── middleware/
└── server.js

---

## 🚀 Build Plan (7 Days)

| Day | Task |
|-----|------|
| 1   | Setup frontend + backend + DB models |
| 2   | Auth (signup, login, JWT) |
| 3   | Transaction CRUD |
| 4   | Dashboard + Charts |
| 5   | Filters + Budget |
| 6   | Insights + Polish |
| 7   | Deploy + README update |

---

## ⚠️ Rules For Myself
- No overbuilding
- No changing stack midway
- Must deploy at the end
- Must write clean code
- Completion > Perfection

---

## 🧠 Self Check Questions
While building, keep asking:
- Why is this state global?
- Why is this component re-rendering?
- Where should this logic live?
- Can I explain this to someone?

---

## 🚀 Deployment
- Frontend → Vercel
- Backend  → Railway
- DB       → Supabase (PostgreSQL)

---

## 📝 Notes
> Started Cohort 2.0 in April 2026
> Will start this project during 
> 2 month year end holiday 2026
> By 3rd year this will be live 🔥

---

*By order of Anubhav Singh — 
anubhavs.tech*
