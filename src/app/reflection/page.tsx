"use client"

import { useState } from "react"
import { db } from "@/lib/db"
import { useDailyStats } from "@/hooks/use-daily-stats"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Check } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"


export default function ReflectionPage() {
    const stats = useDailyStats()
    const router = useRouter()

    const [q1, setQ1] = useState("")
    const [q2, setQ2] = useState("")
    const [q3, setQ3] = useState("")

    const handleSubmit = async () => {
        const todayStr = new Date().toISOString().split('T')[0]

        await db.reflections.put({
            date: todayStr,
            note: "", // General note if needed
            questions: {
                wentWell: q1,
                distractions: q2,
                changeForTomorrow: q3
            },
            createdAt: new Date()
        })

        // Redirect home or show success
        router.push('/')
    }

    const formatHs = (ms: number) => (ms / (1000 * 60 * 60)).toFixed(1)

    return (
        <main className="min-h-screen bg-background p-4 max-w-md mx-auto space-y-6">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/">
                    <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
                </Link>
                <h1 className="text-xl font-bold">End of Day Reflection</h1>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Card>
                    <CardHeader className="p-4 pb-2 text-muted-foreground text-xs uppercase tracking-wider">Tracked</CardHeader>
                    <CardContent className="p-4 pt-0 text-2xl font-bold">
                        {stats ? formatHs(stats.totalTrackedMs) : "-"} <span className="text-sm font-normal text-muted-foreground">hrs</span>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="p-4 pb-2 text-muted-foreground text-xs uppercase tracking-wider">Unclassified</CardHeader>
                    <CardContent className="p-4 pt-0 text-2xl font-bold">
                        {stats ? formatHs(stats.unclassifiedMs) : "-"} <span className="text-sm font-normal text-muted-foreground">hrs</span>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium">What went well today?</label>
                    <Textarea value={q1} onChange={e => setQ1(e.target.value)} placeholder="Completed the core loop..." />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">What distracted you?</label>
                    <Textarea value={q2} onChange={e => setQ2(e.target.value)} placeholder="Email notifications..." />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">What would you change tomorrow?</label>
                    <Textarea value={q3} onChange={e => setQ3(e.target.value)} placeholder="Turn off phone..." />
                </div>

                <Button className="w-full" onClick={handleSubmit}>
                    <Check className="h-4 w-4 mr-2" />
                    Complete Day
                </Button>
            </div>
        </main>
    )
}
