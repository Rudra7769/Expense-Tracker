import { useState } from "react";
import { useExpenses } from "@/contexts/expense-context";
import { useAuth } from "@/contexts/auth-context";

// Helper for INR formatting
const formatINR = (amount: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

export default function IncomeBalanceCard() {
  const { expenses, income, setIncome } = useExpenses();
  const { user } = useAuth();
  const [input, setInput] = useState<string>(income ? income.toString() : "");

  // Calculate totals
  const totalExpenses = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
  const remaining = income - totalExpenses;
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const remainingDays = daysInMonth - today.getDate() + 1;
  const dailyAvg = remainingDays > 0 ? Math.floor(remaining / remainingDays) : 0;

  // Color logic for light/dark theme
  let cardColor =
    "bg-white border-zinc-200 text-zinc-900 dark:bg-[#181f25] dark:border-[#232c33] dark:text-white";
  const percent = income > 0 ? (totalExpenses / income) * 100 : 0;
  // Optionally, you can add warning colors for high usage in both themes

  // Add style to hide number input arrows
  return (
    <>
      <style>{`
        input.hide-number-arrows::-webkit-outer-spin-button,
        input.hide-number-arrows::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input.hide-number-arrows[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>
      <div className={`border rounded-lg p-6 mb-4 shadow-md ${cardColor}`}> 
      <div className="flex items-center justify-between mb-2">
        <span className="text-lg font-semibold">💰 Income & Balance</span>
        <form
          className="flex gap-2 items-center"
          onSubmit={e => {
            e.preventDefault();
            setIncome(Number(input));
          }}
        >
          <input
            type="number"
            min="0"
            placeholder="Monthly Income"
            value={input}
            onChange={e => setInput(e.target.value)}
            className="border border-zinc-200 bg-white text-zinc-900 dark:border-[#232c33] dark:bg-[#181f25] dark:text-white rounded px-2 py-1 w-32 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary hide-number-arrows"
          />
          <button type="submit" className="bg-primary text-white dark:text-black px-3 py-1 rounded">
            Update
          </button>
        </form>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
        <div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">Income</div>
          <div className="font-bold">{formatINR(income)}</div>
        </div>
        <div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">Spent</div>
          <div className="font-bold">{formatINR(totalExpenses)}</div>
        </div>
        <div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">Remaining</div>
          <div className="font-bold">{formatINR(remaining)}</div>
        </div>
        <div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">Daily Avg Spendable</div>
          <div className="font-bold">{formatINR(dailyAvg)}</div>
        </div>
      </div>
      </div>
    </>
  );
}
