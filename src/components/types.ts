export interface Task {
    id: number;
    name: string;
    description: string;
    updateDate: string;
    type: 'set-status' | 'run' | 'delete' | 'create' | 'modify';
}