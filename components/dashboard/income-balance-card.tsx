"use client";

import { useState } from "react";
import { useExpenses } from "@/contexts/expense-context";
import { useAuth } from "@/contexts/auth-context";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Helper for INR formatting
const formatINR = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export default function IncomeBalanceCard() {
  const { expenses, income, setIncome } = useExpenses();
  const { user } = useAuth();
  const [input, setInput] = useState<string>(income ? income.toString() : "");

  // Calculate totals
  const totalExpenses = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
  const remaining = income - totalExpenses;
  const today = new Date();
  const daysInMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate();
  const remainingDays = daysInMonth - today.getDate() + 1;
  const dailyAvg =
    remainingDays > 0 ? Math.floor(remaining / remainingDays) : 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">💰 Income & Balance</CardTitle>
        <form
          className="flex gap-2 items-center"
          onSubmit={(e) => {
            e.preventDefault();
            setIncome(Number(input));
          }}
        >
          <input
            type="number"
            min="0"
            placeholder="Monthly Income"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border border-zinc-200 dark:border-[#232c33] rounded px-2 py-1 w-40 text-sm bg-white dark:bg-[#181f25] text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary hide-number-arrows"
          />
          <button
            type="submit"
            className="bg-primary text-white dark:text-black px-3 py-1 rounded text-sm"
          >
            Update
          </button>
        </form>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
          <div>
            <div className="text-xs text-muted-foreground">Income</div>
            <div className="text-xl font-bold">{formatINR(income)}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Spent</div>
            <div className="text-xl font-bold">{formatINR(totalExpenses)}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Remaining</div>
            <div className="text-xl font-bold">{formatINR(remaining)}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Daily Avg Spendable</div>
            <div className="text-xl font-bold">{formatINR(dailyAvg)}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
