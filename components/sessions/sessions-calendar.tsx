"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MOCK_DATES = Array.from({ length: 35 }, (_, i) => ({
  date: i + 1 <= 30 ? i + 1 : null,
  hasSession: [5, 12, 18, 25].includes(i + 1),
  isToday: i + 1 === 15,
}))

export function SessionsCalendar() {
  return (
    <Card className="bg-surface border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>November 2025</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {DAYS.map((day) => (
            <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
              {day}
            </div>
          ))}
          {MOCK_DATES.map((item, i) => (
            <div
              key={i}
              className={`aspect-square flex items-center justify-center rounded-lg text-sm relative ${
                item.date
                  ? item.isToday
                    ? "bg-brand text-white font-semibold"
                    : "hover:bg-surface-elevated cursor-pointer"
                  : ""
              }`}
            >
              {item.date}
              {item.hasSession && !item.isToday && (
                <span className="absolute bottom-1 w-1 h-1 bg-accent rounded-full" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
