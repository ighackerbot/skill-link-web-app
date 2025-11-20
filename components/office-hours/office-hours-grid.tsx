"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Video, Users } from "lucide-react"

const MOCK_OFFICE_HOURS = [
  {
    id: "1",
    faculty: {
      name: "Dr. Jennifer Smith",
      title: "Professor of Computer Science",
      avatar: "/placeholder.svg?height=64&width=64",
      department: "Computer Science",
    },
    courses: ["CS 101", "CS 301"],
    slots: [
      {
        id: "s1",
        date: "Today",
        time: "2:00 PM - 4:00 PM",
        type: "virtual",
        capacity: 8,
        booked: 5,
      },
      {
        id: "s2",
        date: "Tomorrow",
        time: "10:00 AM - 12:00 PM",
        type: "in-person",
        location: "Office 304",
        capacity: 4,
        booked: 2,
      },
    ],
  },
  {
    id: "2",
    faculty: {
      name: "Prof. Michael Chen",
      title: "Associate Professor of Data Science",
      avatar: "/placeholder.svg?height=64&width=64",
      department: "Computer Science",
    },
    courses: ["CS 201", "CS 401"],
    slots: [
      {
        id: "s3",
        date: "Today",
        time: "3:00 PM - 5:00 PM",
        type: "virtual",
        capacity: 10,
        booked: 7,
      },
    ],
  },
  {
    id: "3",
    faculty: {
      name: "Dr. Sarah Williams",
      title: "Assistant Professor of Algorithms",
      avatar: "/placeholder.svg?height=64&width=64",
      department: "Computer Science",
    },
    courses: ["CS 202", "CS 302"],
    slots: [
      {
        id: "s4",
        date: "Nov 21",
        time: "1:00 PM - 3:00 PM",
        type: "in-person",
        location: "Office 210",
        capacity: 6,
        booked: 3,
      },
    ],
  },
]

export function OfficeHoursGrid() {
  return (
    <div className="space-y-4">
      {MOCK_OFFICE_HOURS.map((officeHour) => (
        <Card key={officeHour.id} className="bg-surface border-border">
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <Avatar className="w-16 h-16">
                <AvatarImage src={officeHour.faculty.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-brand text-white">
                  {officeHour.faculty.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{officeHour.faculty.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{officeHour.faculty.title}</p>
                <div className="flex flex-wrap gap-2">
                  {officeHour.courses.map((course) => (
                    <Badge key={course} variant="outline">
                      {course}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-muted-foreground">Available Time Slots</h4>
              <div className="grid md:grid-cols-2 gap-3">
                {officeHour.slots.map((slot) => (
                  <div key={slot.id} className="p-4 rounded-lg bg-background border border-border space-y-3">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{slot.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{slot.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        {slot.type === "virtual" ? (
                          <>
                            <Video className="w-4 h-4" />
                            <span>Virtual Meeting</span>
                          </>
                        ) : (
                          <>
                            <MapPin className="w-4 h-4" />
                            <span>{slot.location}</span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {slot.booked}/{slot.capacity} spots filled
                        </span>
                      </div>
                    </div>

                    <Button className="w-full bg-brand hover:bg-brand-hover" disabled={slot.booked >= slot.capacity}>
                      {slot.booked >= slot.capacity ? "Fully Booked" : "Book This Slot"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
