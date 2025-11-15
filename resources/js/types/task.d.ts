import { User } from './user';

export interface Task {
    id?: number;
    user_id?: number;
    title?: string;
    description?: string;
    done?: boolean;
    due_at?: string;
    created_at?: string;
    updated_at?: string;
    owner?: User;
}
