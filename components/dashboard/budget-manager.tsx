"use client"

import { useState, useMemo, useEffect } from "react"
import { useExpenses } from "@/contexts/expense-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { FiTarget as Target, FiAlertTriangle as AlertTriangle, FiTrendingUp as TrendingUp, FiSettings as Settings } from "react-icons/fi"

export default function BudgetManager() {
  const { expenses, budget, setBudget } = useExpenses()
  const [budgetAmount, setBudgetAmount] = useState("")
  const [showBudgetDialog, setShowBudgetDialog] = useState(false)
  const { toast } = useToast()

  const budgetData = useMemo(() => {
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    // Calculate current month expenses
    const currentMonthExpenses = expenses
      .filter((expense) => {
        const expenseDate = new Date(expense.date)
        return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear
      })
      .reduce((sum, expense) => sum + expense.amount, 0)

    if (!budget) {
      return {
        hasbudget: false,
        spent: currentMonthExpenses,
        limit: 0,
        remaining: 0,
        percentage: 0,
        isOverBudget: false,
        isNearLimit: false,
      }
    }

    const remaining = budget.monthlyLimit - currentMonthExpenses
    const percentage = (currentMonthExpenses / budget.monthlyLimit) * 100
    const isOverBudget = currentMonthExpenses > budget.monthlyLimit
    const isNearLimit = percentage >= 80 && !isOverBudget

    return {
      hasbudget: true,
      spent: currentMonthExpenses,
      limit: budget.monthlyLimit,
      remaining,
      percentage: Math.min(percentage, 100),
      isOverBudget,
      isNearLimit,
    }
  }, [expenses, budget])

  // Show alerts when budget limits are reached
  useEffect(() => {
    if (budgetData.isOverBudget) {
      toast({
        title: "Budget Exceeded!",
        description: `You've spent ₹${budgetData.spent.toLocaleString("en-IN", {minimumFractionDigits: 0})} this month, exceeding your budget of ₹${budgetData.limit.toLocaleString("en-IN", {minimumFractionDigits: 0})}.`,
        variant: "destructive",
      })
    } else if (budgetData.isNearLimit) {
      toast({
        title: "Approaching Budget Limit",
        description: `You've used ${budgetData.percentage.toFixed(0)}% of your monthly budget.`
      })
    }
  }, [budgetData.isOverBudget, budgetData.isNearLimit])

  const handleSetBudget = () => {
    const amount = Number.parseFloat(budgetAmount)
    if (amount > 0) {
      setBudget(amount)
      setShowBudgetDialog(false)
      setBudgetAmount("")
      toast({
        title: "Budget Updated",
        description: `Your monthly budget has been set to ₹${amount.toLocaleString("en-IN", {minimumFractionDigits: 0})}.`,
      })
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getProgressColor = () => {
    if (budgetData.isOverBudget) return "bg-destructive"
    if (budgetData.isNearLimit) return "bg-yellow-400"
    return "bg-green-500"
  }

  return (
    <Card className="bg-muted border border-border text-foreground">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Monthly Budget
          </CardTitle>
          <Dialog open={showBudgetDialog} onOpenChange={setShowBudgetDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-background">
                <Settings className="h-4 w-4" />
                {budgetData.hasbudget ? "Update" : "Set Budget"}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-background">
              <DialogHeader>
                <DialogTitle>Set Monthly Budget</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="budget">Monthly Budget Amount (₹)</Label>
                  <Input
                    id="budget"
                    type="number"
                    step="1"
                    min="0"
                    placeholder="Enter your monthly budget"
                    value={budgetAmount}
                    onChange={(e) => setBudgetAmount(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSetBudget} className="flex-1">
                    Set Budget
                  </Button>
                  <Button variant="outline" onClick={() => setShowBudgetDialog(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {!budgetData.hasbudget ? (
          <div className="text-center py-6">
            <Target className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-medium text-foreground mb-2">No Budget Set</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Set a monthly budget to track your spending and get alerts when you're approaching your limit.
            </p>
            <Button onClick={() => setShowBudgetDialog(true)} className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Set Monthly Budget
            </Button>
          </div>
        ) : (
          <>
            {/* Budget Alerts */}
            {budgetData.isOverBudget && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  You've exceeded your monthly budget by {formatCurrency(Math.abs(budgetData.remaining))}!
                </AlertDescription>
              </Alert>
            )}

            {budgetData.isNearLimit && !budgetData.isOverBudget && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  You're approaching your budget limit. {formatCurrency(budgetData.remaining)} remaining this month.
                </AlertDescription>
              </Alert>
            )}

            {/* Budget Progress */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Budget Progress</span>
                <span className="text-sm text-muted-foreground">{budgetData.percentage.toFixed(0)}% used</span>
              </div>

              <Progress value={budgetData.percentage} className="h-3" />

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-foreground">{formatCurrency(budgetData.spent)}</p>
                  <p className="text-xs text-muted-foreground">Spent</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{formatCurrency(budgetData.limit)}</p>
                  <p className="text-xs text-muted-foreground">Budget</p>
                </div>
                <div>
                  <p className={`text-2xl font-bold ${budgetData.remaining >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {formatCurrency(budgetData.remaining)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {budgetData.remaining >= 0 ? "Remaining" : "Over Budget"}
                  </p>
                </div>
              </div>
            </div>

            {/* Budget Insights */}
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Budget Insights</span>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                {budgetData.remaining > 0 && (
                  <p>
                    At your current pace, you have {formatCurrency(budgetData.remaining)} left for the rest of the
                    month.
                  </p>
                )}
                {budgetData.percentage < 50 && <p>Great job! You're staying well within your budget this month.</p>}
                {budgetData.percentage >= 50 && budgetData.percentage < 80 && (
                  <p>You're halfway through your budget. Consider monitoring your spending more closely.</p>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
