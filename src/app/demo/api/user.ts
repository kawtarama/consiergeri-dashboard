export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    userType?: string;
    created_at?: string;
}