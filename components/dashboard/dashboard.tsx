"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { ExpenseProvider } from "@/contexts/expense-context"
import Header from "./header"
import StatsCards from "./stats-cards"
import ExpenseForm from "./expense-form"
import ExpenseList from "./expense-list"
import Charts from "./charts"
import BudgetManager from "./budget-manager"
import ExportManager from "./export-manager"
import { Button } from "@/components/ui/button"
import { FiPlus as Plus } from "react-icons/fi"

import IncomeBalanceCard from "./income-balance-card"
import ClickSpark from "@/components/ClickSpark";

export default function Dashboard() {
  const [showExpenseForm, setShowExpenseForm] = useState(false)
  const { user } = useAuth()

  return (
    <ExpenseProvider>
      <ClickSpark sparkColor="#fff" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
        <div className="min-h-screen bg-background">
          <Header />

          <main className="container mx-auto px-4 py-6 space-y-6">
            {/* Welcome Section */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Welcome back, {user?.name}!</h1>
                <p className="text-muted-foreground mt-1">Here's your financial overview</p>
              </div>
              <Button onClick={() => setShowExpenseForm(true)} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Expense
              </Button>
            </div>

            {/* Stats Cards */}
            <StatsCards />


            {/* Income & Balance Card */}
            <IncomeBalanceCard />

            {/* Budget Manager */}
            <BudgetManager />

            {/* Charts */}
            <Charts />

            {/* Export Manager */}
            <ExportManager />

            {/* Expense List */}
            <ExpenseList />

            {/* Expense Form Modal */}
            {showExpenseForm && <ExpenseForm onClose={() => setShowExpenseForm(false)} />}
          </main>
        </div>
      </ClickSpark>
    </ExpenseProvider>
  )
}
