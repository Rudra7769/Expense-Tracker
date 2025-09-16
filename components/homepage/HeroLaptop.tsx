"use client"

import { motion } from "framer-motion"

export default function HeroLaptop() {
  return (
    <div className="relative mx-auto mt-16 w-[95vw] sm:w-[92vw] md:w-[88vw] lg:w-[84vw] xl:w-[80vw] max-w-none px-0 md:-ml-[5vw] lg:-ml-[7.5vw] xl:-ml-[10vw]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative"
      >
        {/* Perimeter glow attached to laptop (follows tilt/scroll) */}
        <div className="pointer-events-none absolute -inset-6 rounded-2xl bg-[radial-gradient(closest-side,rgba(0,101,248,.22),rgba(0,101,248,.1),transparent)] blur-2xl" />


        {/* Laptop shell */}
        <div className="relative z-[1] rounded-xl bg-black/60 backdrop-blur supports-[backdrop-filter]:bg-black/40 shadow-[0_0_40px_0_rgba(0,101,248,0.18),0_0_120px_10px_rgba(0,101,248,0.12),0_20px_100px_-20px_rgba(0,0,0,0.7)]" style={{ perspective: 1200 }}>
          {/* Notch/bar */}
          <div className="absolute left-1/2 top-0 h-1.5 w-24 -translate-x-1/2 rounded-b-2xl bg-[#0065F8]/30" />
          {/* Screen */}
          <motion.div
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-xl"
          >
            <div className="aspect-[16/9] bg-gradient-to-b from-[#0b0b0e] to-[#101317] text-white/80">
              {/* Exact-like layout matching the reference */}
              <div className="absolute inset-0 grid grid-cols-12 gap-5 p-6">
                {/* Sidebar */}
                <div className="col-span-3 rounded-lg bg-white/4 p-4 flex flex-col">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="h-5 w-5 rounded-md bg-white/20" />
                    <span className="text-sm font-semibold text-white/90">Expenzo</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    {["Dashboard","Invoices","Messages","My Wallets","Activity","Analytics"].map((label,i)=> (
                      <div key={i} className="flex items-center gap-3 py-1 px-2 rounded-md hover:bg-white/5">
                        <div className="h-4 w-4 rounded-md bg-white/14" />
                        <span className="flex-1">{label}</span>
                        {label==="Messages" && <span className="inline-flex items-center justify-center text-[10px] h-4 w-4 rounded-full bg-white/20">5</span>}
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto pt-6 space-y-2">
                    <div className="h-3 w-3/4 rounded bg-white/10" />
                    <div className="h-3 w-2/3 rounded bg-white/10" />
                  </div>
                </div>
                {/* Center content */}
                <div className="col-span-6 flex flex-col">
                  <div className="text-lg font-semibold mb-4">Dashboard</div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {[
                      { title: "Business account", value: "$24,098.00" },
                      { title: "Tax Reserve", value: "$2,456.89" },
                      { title: "Savings", value: "$1,980.00" },
                    ].map((card, i) => (
                      <div key={i} className="rounded-lg bg-white/5 p-4">
                        <div className="text-xs text-white/70 mb-1">{card.title}</div>
                        <div className="text-base font-semibold mb-3">{card.value}</div>
                        <div className="grid grid-cols-5 gap-1 items-end h-10">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <div key={j} className="w-full rounded bg-white/10" style={{ height: `${30 + ((i+j)%5)*10}%` }} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Money Flow card */}
                  <div className="rounded-lg bg-white/5 p-4 flex-1">
                    <div className="flex items-center gap-3 mb-3 text-xs">
                      <span className="font-medium">Money Flow</span>
                      <div className="flex items-center gap-3 ml-4">
                        <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#0065F8] inline-block" />Income</span>
                        <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-white/70 inline-block" />Expenses</span>
                      </div>
                      <div className="ml-auto text-[10px] px-2 py-1 rounded bg-white/8">Jan 10 - Jan 16</div>
                    </div>
                    <div className="relative h-full min-h-36 rounded bg-gradient-to-b from-white/3 to-transparent overflow-hidden">
                      {/* grid */}
                      <div className="absolute inset-0 grid grid-cols-12">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <div key={i} className="border-l border-white/6" />
                        ))}
                      </div>
                      {/* two polylines as chart */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 120 40" preserveAspectRatio="none">
                        <polyline points="0,25 10,28 20,22 30,30 40,18 50,32 60,24 70,34 80,26 90,28 100,22 110,30 120,20" fill="none" stroke="#0065F8" strokeWidth="1.5" />
                        <polyline points="0,30 10,32 20,26 30,34 40,24 50,36 60,28 70,38 80,30 90,32 100,26 110,34 120,26" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
                      </svg>
                      {/* moving highlight */}
                      <motion.div
                        initial={{ x: "-15%", opacity: 0.25 }}
                        animate={{ x: ["-15%", "115%"], opacity: [0.25, 0.6, 0.25] }}
                        transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 bottom-0 w-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      />
                    </div>
                  </div>
                </div>
                {/* Right wallet panel */}
                <div className="col-span-3 rounded-lg bg-white/4 p-4 flex flex-col">
                  <div className="text-xs text-white/70 mb-2">Wallet</div>
                  <div className="rounded-lg p-4 mb-3 text-black" style={{ background: "linear-gradient(180deg,#0065F8,#0065F)" }}>
                    <div className="text-[10px] mb-6">Overpay.</div>
                    <div className="text-[10px] mb-1">Balance</div>
                    <div className="text-lg font-semibold">$24,098.00</div>
                  </div>
                  <div className="mx-auto my-2 h-1 w-10 rounded bg-white/20" />
                  <div className="grid grid-cols-4 gap-2 mb-4 text-[10px] text-center text-white/70">
                    {['Send','Receive','Invoicing','More'].map((t)=> (
                      <div key={t} className="rounded-md h-12 bg-white/8 flex flex-col items-center justify-center gap-1">
                        <div className="h-4 w-4 rounded bg-white/20" />
                        {t}
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-white/70 mb-2">Recent Activity</div>
                  <div className="space-y-2 text-[10px]">
                    {[
                      { n: 'Stripe', v: '+$253.10' },
                      { n: 'Facebook charge', v: '-$600.00' },
                      { n: 'Upwork', v: '+$1,243.00' },
                    ].map((row)=> (
                      <div key={row.n} className="flex items-center gap-3">
                        <div className="h-6 w-6 rounded-full bg-white/14" />
                        <div className="flex-1">
                          <div className="text-white/90">{row.n}</div>
                          <div className="text-white/60">Activity</div>
                        </div>
                        <div className="text-white/75">{row.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Scan-line shimmer */}
              <motion.div
                initial={{ y: "-100%" }}
                animate={{ y: ["-100%", "120%"] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: "linear" }}
                className="pointer-events-none absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-white/6 to-transparent"
              />
            </div>
          </motion.div>
        </div>

        {/* Base (keyboard deck) */}
        <div className="mx-auto mt-2 h-3 w-full rounded-b-xl bg-white/10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]" />
      </motion.div>
    </div>
  )
}
