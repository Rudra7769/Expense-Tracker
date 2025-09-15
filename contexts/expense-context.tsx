"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAuth } from "./auth-context"

export interface Expense {
  id: string
  userId: string
  description: string
  amount: number
  category: string
  date: string
  createdAt: string
}

export interface Budget {
  userId: string
  monthlyLimit: number
  currentMonth: string
}

interface ExpenseContextType {
  expenses: Expense[]
  budget: Budget | null
  income: number
  setIncome: (income: number) => void
  addExpense: (expense: Omit<Expense, "id" | "userId" | "createdAt">) => void
  updateExpense: (id: string, expense: Partial<Expense>) => void
  deleteExpense: (id: string) => void
  setBudget: (limit: number) => void
  categories: string[]
  loading: boolean
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined)

export const EXPENSE_CATEGORIES = [
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Entertainment",
  "Bills & Utilities",
  "Healthcare",
  "Travel",
  "Education",
  "Personal Care",
  "Other",
]

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [budget, setBudgetState] = useState<Budget | null>(null)
  const [income, setIncomeState] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      loadUserData()
    }
  }, [user])

  const loadUserData = () => {
    if (!user) return

    // Load expenses
    const allExpenses = JSON.parse(localStorage.getItem("expense-tracker-expenses") || "[]")
    const userExpenses = allExpenses.filter((expense: Expense) => expense.userId === user.id)
    setExpenses(userExpenses)

    // Load budget
    const allBudgets = JSON.parse(localStorage.getItem("expense-tracker-budgets") || "[]")
    const userBudget = allBudgets.find((b: Budget) => b.userId === user.id)
    setBudgetState(userBudget || null)

    // Load income
    const allIncomes = JSON.parse(localStorage.getItem("expense-tracker-incomes") || "{}")
    setIncomeState(allIncomes[user.id] || 0)

    setLoading(false)
  }

  const addExpense = (expenseData: Omit<Expense, "id" | "userId" | "createdAt">) => {
    if (!user) return

    const newExpense: Expense = {
      ...expenseData,
      id: Date.now().toString(),
      userId: user.id,
      createdAt: new Date().toISOString(),
    }

    const allExpenses = JSON.parse(localStorage.getItem("expense-tracker-expenses") || "[]")
    allExpenses.push(newExpense)
    localStorage.setItem("expense-tracker-expenses", JSON.stringify(allExpenses))

    setExpenses((prev) => [...prev, newExpense])
  }

  const updateExpense = (id: string, updates: Partial<Expense>) => {
    const allExpenses = JSON.parse(localStorage.getItem("expense-tracker-expenses") || "[]")
    const updatedExpenses = allExpenses.map((expense: Expense) =>
      expense.id === id ? { ...expense, ...updates } : expense,
    )
    localStorage.setItem("expense-tracker-expenses", JSON.stringify(updatedExpenses))

    setExpenses((prev) => prev.map((expense) => (expense.id === id ? { ...expense, ...updates } : expense)))
  }

  const deleteExpense = (id: string) => {
    const allExpenses = JSON.parse(localStorage.getItem("expense-tracker-expenses") || "[]")
    const filteredExpenses = allExpenses.filter((expense: Expense) => expense.id !== id)
    localStorage.setItem("expense-tracker-expenses", JSON.stringify(filteredExpenses))

    setExpenses((prev) => prev.filter((expense) => expense.id !== id))
  }

  const setBudget = (limit: number) => {
    if (!user) return

    const currentMonth = new Date().toISOString().slice(0, 7) // YYYY-MM format
    const newBudget: Budget = {
      userId: user.id,
      monthlyLimit: limit,
      currentMonth,
    }

    const allBudgets = JSON.parse(localStorage.getItem("expense-tracker-budgets") || "[]")
    const updatedBudgets = allBudgets.filter((b: Budget) => b.userId !== user.id)
    updatedBudgets.push(newBudget)
    localStorage.setItem("expense-tracker-budgets", JSON.stringify(updatedBudgets))

    setBudgetState(newBudget)
  }

  const setIncome = (income: number) => {
    if (!user) return
    setIncomeState(income)
    const allIncomes = JSON.parse(localStorage.getItem("expense-tracker-incomes") || "{}")
    allIncomes[user.id] = income
    localStorage.setItem("expense-tracker-incomes", JSON.stringify(allIncomes))
  }

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        budget,
        income,
        setIncome,
        addExpense,
        updateExpense,
        deleteExpense,
        setBudget,
        categories: EXPENSE_CATEGORIES,
        loading,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  )
}

export function useExpenses() {
  const context = useContext(ExpenseContext)
  if (context === undefined) {
    throw new Error("useExpenses must be used within an ExpenseProvider")
  }
  return context
}
