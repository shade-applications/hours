"use client"

import { useLiveQuery } from "dexie-react-hooks"
import { db } from "@/lib/db"
import { TimerControl } from "../timer/timer-control"
import { Card, CardContent } from "@/components/ui/card"

export function TaskList() {
    const tasks = useLiveQuery(() =>
        db.tasks.orderBy("createdAt").reverse().filter(t => !t.isArchived).toArray()
    )

    if (!tasks) return <div className="p-4 text-muted-foreground">Loading tasks...</div>
    if (tasks.length === 0) return (
        <div className="text-center py-10 text-muted-foreground">
            <p>No tasks yet.</p>
            <p className="text-sm">Add one above to get started.</p>
        </div>
    )

    return (
        <div className="space-y-4">
            {tasks.map(task => (
                <Card key={task.id} className="overflow-hidden">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <span className="font-medium">{task.name}</span>
                            {task.intentHours > 0 && (
                                <span className="text-xs text-muted-foreground">
                                    Intent: {task.intentHours}h
                                </span>
                            )}
                        </div>
                        <TimerControl taskId={task.id} />
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
