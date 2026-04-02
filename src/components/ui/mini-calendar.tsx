"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface CalendarEvent {
  date: Date
  title: string
  color?: string
}

interface MiniCalendarProps {
  events?: CalendarEvent[]
  className?: string
}

const DAYS_OF_WEEK = ["S", "M", "T", "W", "T", "F", "S"]

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

export function MiniCalendar({ events = [], className }: MiniCalendarProps) {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [selectedDate, setSelectedDate] = useState<Date>(today)

  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth)
  const prevMonthDays = getDaysInMonth(
    currentMonth === 0 ? currentYear - 1 : currentYear,
    currentMonth === 0 ? 11 : currentMonth - 1
  )

  const monthName = new Date(currentYear, currentMonth).toLocaleString(
    "default",
    { month: "long" }
  )

  function goToPrevMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear((y) => y - 1)
    } else {
      setCurrentMonth((m) => m - 1)
    }
  }

  function goToNextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear((y) => y + 1)
    } else {
      setCurrentMonth((m) => m + 1)
    }
  }

  function getEventsForDate(date: Date) {
    return events.filter((e) => isSameDay(e.date, date))
  }

  // Build calendar grid cells
  const cells: Array<{ date: Date; inMonth: boolean }> = []

  // Previous month trailing days
  for (let i = firstDay - 1; i >= 0; i--) {
    const day = prevMonthDays - i
    const month = currentMonth === 0 ? 11 : currentMonth - 1
    const year = currentMonth === 0 ? currentYear - 1 : currentYear
    cells.push({ date: new Date(year, month, day), inMonth: false })
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({
      date: new Date(currentYear, currentMonth, d),
      inMonth: true,
    })
  }

  // Next month leading days to fill last row
  const remaining = 7 - (cells.length % 7)
  if (remaining < 7) {
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear
    for (let d = 1; d <= remaining; d++) {
      cells.push({ date: new Date(nextYear, nextMonth, d), inMonth: false })
    }
  }

  const selectedEvents = getEventsForDate(selectedDate)

  return (
    <div
      className={cn(
        "rounded-lg border bg-card text-card-foreground p-3",
        className
      )}
    >
      {/* Month/Year header */}
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={goToPrevMonth}
          className="h-7 w-7 inline-flex items-center justify-center rounded-md hover:bg-muted text-muted-foreground transition-colors"
          aria-label="Previous month"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <span className="text-sm font-semibold">
          {monthName} {currentYear}
        </span>
        <button
          onClick={goToNextMonth}
          className="h-7 w-7 inline-flex items-center justify-center rounded-md hover:bg-muted text-muted-foreground transition-colors"
          aria-label="Next month"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS_OF_WEEK.map((day, i) => (
          <div
            key={i}
            className="text-center text-xs font-medium text-muted-foreground py-1"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7">
        {cells.map((cell, i) => {
          const isToday = isSameDay(cell.date, today)
          const isSelected = isSameDay(cell.date, selectedDate)
          const dayEvents = getEventsForDate(cell.date)
          const hasEvents = dayEvents.length > 0

          return (
            <button
              key={i}
              onClick={() => setSelectedDate(cell.date)}
              className={cn(
                "relative h-8 w-full inline-flex flex-col items-center justify-center rounded-md text-xs transition-colors",
                "hover:bg-muted",
                !cell.inMonth && "text-muted-foreground/40",
                cell.inMonth && "text-card-foreground",
                isToday &&
                  !isSelected &&
                  "bg-primary/10 text-primary font-semibold",
                isSelected && "bg-primary text-primary-foreground font-semibold"
              )}
            >
              <span>{cell.date.getDate()}</span>
              {hasEvents && (
                <span className="absolute bottom-0.5 flex gap-0.5">
                  {dayEvents.slice(0, 3).map((ev, j) => (
                    <span
                      key={j}
                      className={cn(
                        "h-1 w-1 rounded-full",
                        isSelected
                          ? "bg-primary-foreground"
                          : "bg-primary"
                      )}
                      style={
                        ev.color && !isSelected
                          ? { backgroundColor: ev.color }
                          : undefined
                      }
                    />
                  ))}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Selected day event list */}
      <div className="mt-3 border-t pt-2">
        <p className="text-xs font-medium text-muted-foreground mb-1.5">
          {selectedDate.toLocaleDateString("default", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}
        </p>
        {selectedEvents.length === 0 ? (
          <p className="text-xs text-muted-foreground/60">No events</p>
        ) : (
          <ul className="space-y-1">
            {selectedEvents.map((ev, i) => (
              <li key={i} className="flex items-center gap-2 text-xs">
                <span
                  className="h-2 w-2 shrink-0 rounded-full bg-primary"
                  style={ev.color ? { backgroundColor: ev.color } : undefined}
                />
                <span className="truncate text-card-foreground">
                  {ev.title}
                </span>
                {ev.date.getHours() !== 0 && (
                  <span className="ml-auto shrink-0 text-muted-foreground">
                    {ev.date.toLocaleTimeString("default", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
