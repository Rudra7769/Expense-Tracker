"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from "recharts"
import { motion } from "framer-motion"

const pieData = [
  { name: "Food", value: 35, color: "#8b5cf6" },
  { name: "Transport", value: 25, color: "#3b82f6" },
  { name: "Entertainment", value: 20, color: "#10b981" },
  { name: "Shopping", value: 20, color: "#f59e0b" },
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

export function DashboardPreview() {
  return (
    <section className="py-24 bg-background">
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

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="bg-card border border-border/50 rounded-2xl p-8 shadow-2xl">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Stats Cards */}
              <div className="lg:col-span-3 grid md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
                  <CardContent className="p-6">
                    <div className="text-2xl font-bold text-accent">$2,847</div>
                    <div className="text-sm text-muted-foreground">Total Expenses</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                  <CardContent className="p-6">
                    <div className="text-2xl font-bold text-primary">$1,153</div>
                    <div className="text-sm text-muted-foreground">Budget Remaining</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-chart-3/10 to-chart-3/5 border-chart-3/20">
                  <CardContent className="p-6">
                    <div className="text-2xl font-bold text-chart-3">71%</div>
                    <div className="text-sm text-muted-foreground">Budget Used</div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Spending by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="value">
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Weekly Spending</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={barData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Bar dataKey="amount" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Monthly Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={lineData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Line type="monotone" dataKey="amount" stroke="#8b5cf6" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
