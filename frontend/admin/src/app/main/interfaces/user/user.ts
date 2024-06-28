import { role } from "../role/role";

export interface User {
    id: number,
    username: string,
    email: string,
    password: string,
    phone: string,
    // birthday: Date,
    address: string,
    role_id: number,
    role: role,
    status: string,
    // createdAt: Date
}
