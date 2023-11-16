"use client";

import React, { useState, useEffect, ReactChild } from 'react'
import UserContext from './userContext'
import { userCurrent } from '@/services/userService';

interface User {
    username: string,
    email: string,
    _id: string
}

const UserProvider = ({ children }: any) => {

    const [user, setUser] = useState<User | undefined>(undefined);

    useEffect(() => {
        async function load() {
            try {
                const tempUser: User = await userCurrent();
                console.log("aa" + tempUser._id);
                setUser({ ...tempUser });
                console.log("bb " + user);
                // setUser((prevUser) => {
                //     console.log("bb " + prevUser);
                //     return { ...tempUser };
                //   });
            } catch (error) {
                console.log(error);
                // toast.error("error in loading current  user");
                setUser(undefined);
            }
        }
        load();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;