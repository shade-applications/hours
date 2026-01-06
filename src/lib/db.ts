import Dexie, { type EntityTable } from 'dexie';

export interface Task {
    id: number;
    name: string;
    intentHours: number; // Scheduled/Intended duration in hours (can be 0)
    createdAt: Date;
    isArchived: boolean;
    pomodoroSettings?: {
        workDuration: number; // minutes
        breakDuration: number; // minutes
        longBreakDuration: number; // minutes
    };
}

export interface TimeLog {
    id: number;
    taskId: number | null; // null means "Unclassified" but explicitly logged? 
    // Actually PRD says "Unclassified" if no timer running.
    // But we might want to log "Unclassified" blocks explicitly after reflection.
    startTime: Date;
    endTime: Date | null; // null means currently running (active)
    isParallel: boolean;
    accuracyWeight: number; // 1.0 for single task, 0.5 for two parallel, etc.
}

export interface Reflection {
    date: string; // YYYY-MM-DD
    note: string;
    questions: {
        wentWell: string;
        distractions: string;
        changeForTomorrow: string;
    };
    createdAt: Date;
}

const db = new Dexie('HoursDatabase') as Dexie & {
    tasks: EntityTable<Task, 'id'>;
    logs: EntityTable<TimeLog, 'id'>;
    reflections: EntityTable<Reflection, 'date'>;
};

// Schema definition
db.version(1).stores({
    tasks: '++id, name, createdAt, isArchived',
    logs: '++id, taskId, startTime, endTime, isParallel',
    reflections: 'date, createdAt'
});

export { db };
