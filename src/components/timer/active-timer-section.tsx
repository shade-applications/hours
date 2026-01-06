"use client"

import { useEffect, useState } from "react"
import { useTimerStore } from "@/lib/store"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Square } from "lucide-react"
import { timerActions } from "@/lib/timer-actions"
import { useLiveQuery } from "dexie-react-hooks"

export function ActiveTimerSection() {
    const { activeTaskId, isRunning, startTime } = useTimerStore()
    const [elapsed, setElapsed] = useState(0)

    // Fetch active task details
    const activeTask = useLiveQuery(async () => {
        if (!activeTaskId) return null
        return await db.tasks.get(activeTaskId)
    }, [activeTaskId])

    useEffect(() => {
        let interval: NodeJS.Timeout
        if (isRunning && startTime) {
            setElapsed(Date.now() - startTime)
            interval = setInterval(() => {
                setElapsed(Date.now() - startTime)
            }, 1000)
        } else {
            setElapsed(0)
        }
        return () => clearInterval(interval)
    }, [isRunning, startTime])

    const formatLargeTime = (ms: number) => {
        const s = Math.floor(ms / 1000)
        const h = Math.floor(s / 3600)
        const m = Math.floor((s % 3600) / 60)
        const sec = s % 60
        return { h, m, sec }
    }

    if (!isRunning || !activeTask) {
        // Maybe show unclassified time since last stop? 
        // For now show nothing or a "Ready" state.
        return null
    }

    const { h, m, sec } = formatLargeTime(elapsed)

    return (
        <div className="w-full py-8 text-center bg-card border-b animate-in fade-in slide-in-from-top-4">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Current Focus
            </h2>
            <h1 className="text-3xl font-bold text-foreground mb-4">
                {activeTask.name}
            </h1>
            <div className="font-mono text-6xl font-light tracking-tighter tabular-nums mb-8 flex justify-center items-baseline gap-2">
                <span>{h.toString().padStart(2, '0')}</span>
                <span className="text-muted-foreground text-4xl">:</span>
                <span>{m.toString().padStart(2, '0')}</span>
                <span className="text-muted-foreground text-4xl">:</span>
                <span>{sec.toString().padStart(2, '0')}</span>
            </div>

            <Button size="lg" variant="destructive" className="rounded-full px-8" onClick={() => timerActions.stop()}>
                <Square className="h-5 w-5 mr-2 fill-current" />
                Stop Session
            </Button>
        </div>
    )
}
