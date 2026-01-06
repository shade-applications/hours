import { ActiveTimerSection } from "@/components/timer/active-timer-section"
import { TaskList } from "@/components/tasks/task-list"
import { AddTaskInput } from "@/components/tasks/add-task-input"
import { Button } from "@/components/ui/button"
import { ArrowRight, Moon } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const today = new Date().toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <main className="min-h-screen bg-background pb-20">
      <ActiveTimerSection />

      <div className="max-w-md mx-auto px-4 py-8 space-y-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Today</h1>
          <p className="text-muted-foreground">{today}</p>
        </div>

        <AddTaskInput />

        <TaskList />

        <div className="pt-8 border-t">
          <Link href="/reflection">
            <Button variant="ghost" className="w-full justify-between group">
              <span className="flex items-center">
                <Moon className="h-4 w-4 mr-2" />
                End Day Reflection
              </span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
