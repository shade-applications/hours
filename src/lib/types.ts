export interface Task {
    id: number;
    name: string;
    intent_hours: number;
    created_at: string;
    is_archived: number; // SQLite boolean is 0/1
}

export interface TimeLog {
    id: number;
    task_id: number;
    start_time: string;
    end_time: string | null;
    is_parallel: number;
}

export interface Reflection {
    id: number;
    date: string;
    q_went_well: string;
    q_distractions: string;
    q_tomorrow: string;
    created_at: string;
}
