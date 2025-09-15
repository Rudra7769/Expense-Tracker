"use client"

import { useState } from "react"
import { useExpenses } from "@/contexts/expense-context"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { FiDownload as Download, FiFileText as FileText, FiFile as File } from "react-icons/fi"
import { LuFileSpreadsheet as FileSpreadsheet } from "react-icons/lu"

export default function ExportManager() {
  const { expenses } = useExpenses()
  const { user } = useAuth()
  const [exportFormat, setExportFormat] = useState("csv")
  const [exportPeriod, setExportPeriod] = useState("all")
  const { toast } = useToast()

  const getFilteredExpenses = () => {
    const now = new Date()

    switch (exportPeriod) {
      case "month":
        return expenses.filter((expense) => {
          const expenseDate = new Date(expense.date)
          return expenseDate.getMonth() === now.getMonth() && expenseDate.getFullYear() === now.getFullYear()
        })
      case "year":
        return expenses.filter((expense) => {
          const expenseDate = new Date(expense.date)
          return expenseDate.getFullYear() === now.getFullYear()
        })
      case "quarter":
        const currentQuarter = Math.floor(now.getMonth() / 3)
        return expenses.filter((expense) => {
          const expenseDate = new Date(expense.date)
          const expenseQuarter = Math.floor(expenseDate.getMonth() / 3)
          return expenseQuarter === currentQuarter && expenseDate.getFullYear() === now.getFullYear()
        })
      default:
        return expenses
    }
  }

  const exportToCSV = () => {
    const filteredExpenses = getFilteredExpenses()

    if (filteredExpenses.length === 0) {
      toast({
        title: "No data to export",
        description: "There are no expenses for the selected period.",
        variant: "destructive",
      })
      return
    }

    const headers = ["Date", "Description", "Amount", "Category"]
    const csvContent = [
      headers.join(","),
      ...filteredExpenses.map((expense) =>
        [
          expense.date,
          `"${expense.description.replace(/"/g, '""')}"`,
          expense.amount.toFixed(2),
          `"${expense.category}"`,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `expenses_${exportPeriod}_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Export successful",
      description: "Your expenses have been exported to CSV.",
    })
  }

  const exportToJSON = () => {
    const filteredExpenses = getFilteredExpenses()

    if (filteredExpenses.length === 0) {
      toast({
        title: "No data to export",
        description: "There are no expenses for the selected period.",
        variant: "destructive",
      })
      return
    }

    const exportData = {
      user: user?.name,
      exportDate: new Date().toISOString(),
      period: exportPeriod,
      totalExpenses: filteredExpenses.length,
      totalAmount: filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0),
      expenses: filteredExpenses.map((expense) => ({
        date: expense.date,
        description: expense.description,
        amount: expense.amount,
        category: expense.category,
      })),
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `expenses_${exportPeriod}_${new Date().toISOString().split("T")[0]}.json`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Export successful",
      description: "Your expenses have been exported to JSON.",
    })
  }

  const generatePDFReport = () => {
    const filteredExpenses = getFilteredExpenses()

    if (filteredExpenses.length === 0) {
      toast({
        title: "No data to export",
        description: "There are no expenses for the selected period.",
        variant: "destructive",
      })
      return
    }

    // Calculate summary statistics
    const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0)
    const categoryTotals = filteredExpenses.reduce(
      (acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount
        return acc
      },
      {} as Record<string, number>,
    )

    // Create HTML content for PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Expense Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .summary { background: #f5f5f5; padding: 15px; margin-bottom: 20px; border-radius: 5px; }
            .table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .table th, .table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            .table th { background-color: #f2f2f2; }
            .category-summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; }
            .category-item { background: #f9f9f9; padding: 10px; border-radius: 5px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Expense Report</h1>
            <p>Generated for ${user?.name} on ${new Date().toLocaleDateString()}</p>
            <p>Period: ${exportPeriod === "all" ? "All Time" : exportPeriod.charAt(0).toUpperCase() + exportPeriod.slice(1)}</p>
          </div>
          
          <div class="summary">
            <h2>Summary</h2>
            <p><strong>Total Expenses:</strong> ${filteredExpenses.length}</p>
            <p><strong>Total Amount:</strong> $${totalAmount.toFixed(2)}</p>
            <p><strong>Average per Transaction:</strong> $${(totalAmount / filteredExpenses.length).toFixed(2)}</p>
          </div>

          <h2>Category Breakdown</h2>
          <div class="category-summary">
            ${Object.entries(categoryTotals)
              .map(
                ([category, amount]) => `
              <div class="category-item">
                <strong>${category}</strong><br>
                $${amount.toFixed(2)} (${((amount / totalAmount) * 100).toFixed(1)}%)
              </div>
            `,
              )
              .join("")}
          </div>

          <h2>Detailed Expenses</h2>
          <table class="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              ${filteredExpenses
                .map(
                  (expense) => `
                <tr>
                  <td>${new Date(expense.date).toLocaleDateString()}</td>
                  <td>${expense.description}</td>
                  <td>${expense.category}</td>
                  <td>$${expense.amount.toFixed(2)}</td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `

    // Create and download HTML file (which can be printed as PDF)
    const blob = new Blob([htmlContent], { type: "text/html" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `expense_report_${exportPeriod}_${new Date().toISOString().split("T")[0]}.html`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Report generated",
      description: "Your expense report has been generated. Open the HTML file and print to PDF.",
    })
  }

  const handleExport = () => {
    switch (exportFormat) {
      case "csv":
        exportToCSV()
        break
      case "json":
        exportToJSON()
        break
      case "pdf":
        generatePDFReport()
        break
      default:
        exportToCSV()
    }
  }

  const getFormatIcon = () => {
    switch (exportFormat) {
      case "csv":
        return <FileSpreadsheet className="h-4 w-4" />
      case "json":
        return <File className="h-4 w-4" />
      case "pdf":
        return <FileText className="h-4 w-4" />
      default:
        return <Download className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Export & Reports
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Export Format</label>
            <Select value={exportFormat} onValueChange={setExportFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV (Excel Compatible)</SelectItem>
                <SelectItem value="json">JSON (Data Backup)</SelectItem>
                <SelectItem value="pdf">PDF Report</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Time Period</label>
            <Select value={exportPeriod} onValueChange={setExportPeriod}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={handleExport} className="flex items-center gap-2 flex-1">
            {getFormatIcon()}
            Export {exportFormat.toUpperCase()}
          </Button>

          <Button
            variant="outline"
            onClick={generatePDFReport}
            className="flex items-center gap-2 flex-1 bg-transparent"
          >
            <FileText className="h-4 w-4" />
            Generate Report
          </Button>
        </div>

        <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
          <p className="font-medium mb-1">Export Information:</p>
          <ul className="space-y-1">
            <li>
              • <strong>CSV:</strong> Compatible with Excel and Google Sheets
            </li>
            <li>
              • <strong>JSON:</strong> Complete data backup with metadata
            </li>
            <li>
              • <strong>PDF Report:</strong> Formatted report with summaries and charts
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
