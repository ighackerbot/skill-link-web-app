"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function OfficeHoursFilters() {
  return (
    <Card className="bg-surface border-border sticky top-24">
      <CardHeader>
        <CardTitle className="text-lg">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Department</Label>
          <Select>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="cs">Computer Science</SelectItem>
              <SelectItem value="math">Mathematics</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="physics">Physics</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-semibold">Course</Label>
          <Select>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="All Courses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              <SelectItem value="cs101">CS 101</SelectItem>
              <SelectItem value="cs201">CS 201</SelectItem>
              <SelectItem value="cs301">CS 301</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-semibold">Availability</Label>
          <div className="space-y-2">
            {["Today", "This Week", "Next Week"].map((time) => (
              <div key={time} className="flex items-center space-x-2">
                <Checkbox id={time} />
                <label htmlFor={time} className="text-sm text-muted-foreground cursor-pointer">
                  {time}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-semibold">Meeting Type</Label>
          <div className="space-y-2">
            {["Virtual", "In-Person"].map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox id={type} />
                <label htmlFor={type} className="text-sm text-muted-foreground cursor-pointer">
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
