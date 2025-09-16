"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, Tooltip } from "recharts"
import { motion } from "framer-motion"

const pieData = [
  { name: "Food", value: 35, color: "#0065F8" },
  { name: "Transport", value: 25, color: "#3b82f6" },
  { name: "Entertainment", value: 20, color: "#16a34a" },
  { name: "Shopping", value: 20, color: "#f97316" },
]

const barData = [
  { name: "Mon", amount: 120 },
  { name: "Tue", amount: 85 },
  { name: "Wed", amount: 200 },
  { name: "Thu", amount: 95 },
  { name: "Fri", amount: 180 },
  { name: "Sat", amount: 250 },
  { name: "Sun", amount: 140 },
]

const lineData = [
  { month: "Jan", amount: 2400 },
  { month: "Feb", amount: 1800 },
  { month: "Mar", amount: 2200 },
  { month: "Apr", amount: 1900 },
  { month: "May", amount: 2100 },
  { month: "Jun", amount: 1700 },
]

const statsCards = [
  {
    title: "Total Expenses",
    value: "$2,847",
    colorClass: "text-accent",
    bgClass: "bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20",
  },
  {
    title: "Budget Remaining",
    value: "$1,153",
    colorClass: "text-primary",
    bgClass: "bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20",
  },
  {
    title: "Budget Used",
    value: "71%",
    colorClass: "text-chart-3",
    bgClass: "bg-gradient-to-br from-chart-3/10 to-chart-3/5 border-chart-3/20",
  },
]

export function DashboardPreview() {
  const chartComponents = [
    {
      title: "Spending by Category",
      chart: (
        <PieChart>
          <Tooltip
            contentStyle={{
              background: "rgba(0, 0, 0, 0.8)",
              borderColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "0.5rem",
            }}
            cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
          />
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={80}
            dataKey="value"
            isAnimationActive={true}
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} className="focus:outline-none" />
            ))}
          </Pie>
        </PieChart>
      ),
    },
    {
      title: "Weekly Spending",
      chart: (
        <BarChart data={barData}>
          <XAxis
            dataKey="name"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              background: "rgba(0, 0, 0, 0.8)",
              borderColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "0.5rem",
            }}
            cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
          />
          <Bar dataKey="amount" fill="#0065F8" radius={[4, 4, 0, 0]} isAnimationActive={true} />
        </BarChart>
      ),
    },
    {
      title: "Monthly Trend",
      chart: (
        <LineChart data={lineData}>
          <XAxis
            dataKey="month"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              background: "rgba(0, 0, 0, 0.8)",
              borderColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "0.5rem",
            }}
            cursor={{ stroke: "rgba(255, 255, 255, 0.2)", strokeWidth: 1 }}
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#0065F8"
            strokeWidth={3}
            dot={{ r: 4, fill: "#0065F8" }}
            activeDot={{ r: 8, fill: "#0065F8" }}
            isAnimationActive={true}
          />
        </LineChart>
      ),
    },
  ]

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 text-balance">
            See Your Money in <span className="text-accent">Action</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Get instant insights with beautiful charts and comprehensive analytics
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-card border border-border/50 rounded-2xl p-8 shadow-2xl shadow-accent/10">
            <motion.div
              className="grid md:grid-cols-3 gap-8"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Stats Cards */}
              {statsCards.map((card, i) => (
                <motion.div
                  key={`stat-${i}`}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <Card className={`${card.bgClass} h-full`}>
                    <CardContent className="p-6">
                      <div className={`text-2xl font-bold ${card.colorClass}`}>{card.value}</div>
                      <div className="text-sm text-muted-foreground">{card.title}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {/* Charts */}
              {chartComponents.map((chart, i) => (
                <motion.div
                  key={`chart-${i}`}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Card className="h-full bg-white/5 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-lg">{chart.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={200}>
                        {chart.chart}
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
