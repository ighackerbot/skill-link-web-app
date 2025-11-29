"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getMySlots, createFacultySlot, deleteFacultySlot } from "@/lib/db/office-hours"
import { toast } from "sonner"
import { Trash2, Calendar, Clock } from "lucide-react"
import { format } from "date-fns"

export function ManageSlots() {
    const [slots, setSlots] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState({
        topic: "",
        batch: "2028",
        scheduledAt: "",
        duration: "30",
        capacity: "5",
        mode: "online",
        location: ""
    })

    async function loadSlots() {
        try {
            const data = await getMySlots()
            setSlots(data)
        } catch (error) {
            toast.error("Failed to load slots")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadSlots()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await createFacultySlot({
                topic: formData.topic,
                batch: formData.batch,
                scheduled_at: new Date(formData.scheduledAt).toISOString(),
                duration: parseInt(formData.duration),
                capacity: parseInt(formData.capacity),
                mode: formData.mode,
                location: formData.location
            })
            toast.success("Slot created successfully")
            loadSlots()
            setFormData({ ...formData, topic: "", scheduledAt: "" })
        } catch (error) {
            toast.error("Failed to create slot")
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await deleteFacultySlot(id)
            toast.success("Slot deleted")
            loadSlots()
        } catch (error) {
            toast.error("Failed to delete slot")
        }
    }

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Create New Slot</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Topic</Label>
                                <Input
                                    value={formData.topic}
                                    onChange={e => setFormData({ ...formData, topic: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Batch</Label>
                                <Select
                                    value={formData.batch}
                                    onValueChange={v => setFormData({ ...formData, batch: v })}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="2028">2028</SelectItem>
                                        <SelectItem value="2029">2029</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Date & Time</Label>
                                <Input
                                    type="datetime-local"
                                    value={formData.scheduledAt}
                                    onChange={e => setFormData({ ...formData, scheduledAt: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Duration (mins)</Label>
                                <Input
                                    type="number"
                                    value={formData.duration}
                                    onChange={e => setFormData({ ...formData, duration: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Capacity</Label>
                                <Input
                                    type="number"
                                    value={formData.capacity}
                                    onChange={e => setFormData({ ...formData, capacity: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Mode</Label>
                                <Select
                                    value={formData.mode}
                                    onValueChange={v => setFormData({ ...formData, mode: v })}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="online">Online</SelectItem>
                                        <SelectItem value="offline">Offline</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <Button type="submit">Create Slot</Button>
                    </form>
                </CardContent>
            </Card>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Your Slots</h3>
                {slots.map(slot => (
                    <Card key={slot.id}>
                        <CardContent className="p-4 flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="font-medium">{slot.topic}</p>
                                <div className="flex gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {format(new Date(slot.scheduled_at), 'MMM d, yyyy')}</span>
                                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {format(new Date(slot.scheduled_at), 'h:mm a')}</span>
                                    <span>Batch: {slot.batch}</span>
                                    <span>{slot.booked_count}/{slot.capacity} booked</span>
                                </div>
                            </div>
                            <Button variant="destructive" size="icon" onClick={() => handleDelete(slot.id)}>
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
