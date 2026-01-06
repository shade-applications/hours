"use client"

import { useState } from "react"
import { db } from "@/lib/db"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function AddTaskInput() {
    const [name, setName] = useState("")
    const [intent, setIntent] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!name.trim()) return

        await db.tasks.add({
            name: name.trim(),
            intentHours: intent ? parseFloat(intent) : 0,
            createdAt: new Date(),
            isArchived: false
        })

        setName("")
        setIntent("")
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
                placeholder="What's your intention?"
                value={name}
                onChange={e => setName(e.target.value)}
                className="flex-1"
            />
            <Input
                type="number"
                placeholder="Hours?"
                value={intent}
                onChange={e => setIntent(e.target.value)}
                className="w-24"
                min="0.1"
                step="0.1"
            />
            <Button type="submit" size="icon">
                <Plus className="h-4 w-4" />
            </Button>
        </form>
    )
}
