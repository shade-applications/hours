"use client"

import { useEffect, useState } from "react"
import { useTimerStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Play, Square } from "lucide-react"
import { timerActions } from "@/lib/timer-actions"

export function TimerControl({ taskId }: { taskId: number }) {
    const { activeTaskId, isRunning, startTime } = useTimerStore()
    const [elapsed, setElapsed] = useState(0)

    const isActive = activeTaskId === taskId && isRunning

    useEffect(() => {
        let interval: NodeJS.Timeout
        if (isActive && startTime) {
            setElapsed(Date.now() - startTime)
            interval = setInterval(() => {
                setElapsed(Date.now() - startTime)
            }, 1000)
        } else {
            setElapsed(0)
        }
        return () => clearInterval(interval)
    }, [isActive, startTime])

    const handleStart = async () => {
        await timerActions.start(taskId)
    }

    const handleStop = async () => {
        await timerActions.stop()
    }

    const formatTime = (ms: number) => {
        const s = Math.floor(ms / 1000)
        const h = Math.floor(s / 3600)
        const m = Math.floor((s % 3600) / 60)
        const sec = s % 60
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
    }

    if (isActive) {
        return (
            <div className="flex items-center gap-4">
                <div className="font-mono text-xl tabular-nums text-primary font-bold">
                    {formatTime(elapsed)}
                </div>
                <Button size="icon" variant="destructive" onClick={handleStop}>
                    <Square className="h-4 w-4 fill-current" />
                </Button>
            </div>
        )
    }

    return (
        <Button
            size="sm"
            variant="outline"
            onClick={handleStart}
            disabled={isRunning && activeTaskId !== taskId} // Basic single-timer constraint
        >
            <Play className="h-4 w-4 mr-2" />
            Start
        </Button>
    )
}
