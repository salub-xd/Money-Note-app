"use client";
import { createContext } from "react";
interface User {
    username: string,
    email: string,
    _id: string
}
const UserContext = createContext<User | null>(null);
export default UserContext;