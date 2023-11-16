"use client";

import { userCurrent, userLogout } from "@/services/userService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'

const Navbar: React.FC = () => {
    
    const router = useRouter();
    const [dropdownMenu, setDropdownMenu] = useState<Boolean>(false);
    const [bgClass, setBgClass] = useState<Boolean>(false);
    const [user, setUser] = useState<string | undefined>(undefined);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY || window.pageYOffset;
            const scrollThreshold = 55;
            if (scrollY >= scrollThreshold) {
                setBgClass(true);
            } else {
                setBgClass(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };




    }, []);

    useEffect(() => {
        const getCurrentUser = async () => {
            try {

                const user = await userCurrent();
                // console.log(user);
                setUser(user.username);

            } catch (error: any) {
                console.log(error);
            }
        }
        getCurrentUser();
    }, []);

    const logoutUser = async (e:any) => {
        e.preventDefault();
        try {
            const logout = await userLogout();
            router.push('/login');
            document.location.reload();
        } catch (error: any) {
            console.log(error);
        }
    }

    const handleClick = () => {
        // console.log("Clicked on Menu bar");
        setDropdownMenu(!dropdownMenu);
    };

    return (
        <>
            <div className={bgClass ? `bg-[#1e1e1e30] w-full flex fixed flex-col z-10 py-3 px-6 backdrop-blur-md sm:px-12 sm:py-0 ` : `bg-[#08324a] w-full flex fixed flex-col z-10 py-3 px-6 backdrop-blur-md sm:px-12 sm:py-0`}>
                <div className="flex justify-between items-center ">
                    <Link href={'/'}>
                        <div className=" font-bold mx-6 font-Alumni text-white text-4xl border-b-4 border-sky-800 ">
                            Money-Note-app
                        </div>
                    </Link>
                    {/* <div className="">
                        <div className="rounded p-2">
                            <input className=" w-80 px-2 p-1 mx-3 outline-none rounded-lg text-black " type="text" placeholder="Search Here..." name="search" />
                            <button className="rounded-lg p-1 bg-cyan-700 text-white">Search</button>
                        </div>
                    </div> */}
                    <ul className="hidden sm:flex ">
                       
                        {/* <Link className="p-6 text-xl font-Roboto text-white hover:text-sky-600 hover:transition-all hover:duration-300 hover:ease-in-out" href="/tasks">Tasks</Link> */}
                        {user ? (<>
                            <Link className="p-6 text-xl font-Roboto text-white hover:text-sky-600 hover:transition-all hover:duration-300 hover:ease-in-out" href="/add-post">Add Post</Link>
                            <Link className="p-6  text-xl capitalize font-Roboto text-white hover:text-sky-600 hover:transition-all hover:duration-300 hover:ease-in-out" href="/">{user}</Link>
                            <Link onClick={logoutUser} className="p-6  text-xl font-Roboto text-white hover:text-sky-600 hover:transition-all hover:duration-300 hover:ease-in-out" href="/">Logout</Link>
                        </>) : (<>
                            <Link className="p-6  text-xl font-Roboto text-white hover:text-sky-600 hover:transition-all hover:duration-300 hover:ease-in-out" href="/login">Login</Link>
                            <Link className="p-6  text-xl font-Roboto text-white hover:text-sky-600 hover:transition-all hover:duration-300 hover:ease-in-out" href="/signup">Sign Up</Link>
                        </>)}
                    </ul>
                    <div
                        onClick={handleClick}
                        className=" cursor-pointer px-5 flex text-4xl text-center  text-white sm:hidden hover:text-sky-500 hover:duration-300">{!dropdownMenu ? <div className="text-4xl text-white"><AiOutlineMenu /> </div>
                            : <div className="text-4xl"><AiOutlineClose /></div>}</div>
                </div>
            </div>
            <div
                className={
                    dropdownMenu
                        ? "w-56 fixed top-20 right-16 bg-[#1e1e1e30] backdrop-blur-lg shadow-2xl sm:hidden "
                        : "hidden"
                }
            >
                <ul className="mx-10 flex items-center flex-col rounded-md ">
                    <Link onClick={handleClick} className="p-3 text-lg text-white hover:text-sky-600 hover:transition-all hover:duration-300 hover:ease-in-out" href="/">Home</Link>
                    <Link onClick={handleClick} className="p-3 text-lg text-white hover:text-sky-600 hover:transition-all hover:duration-300 hover:ease-in-out" href="/income">Income</Link>
                    <Link onClick={handleClick} className="p-3 text-lg text-white hover:text-sky-600 hover:transition-all hover:duration-300 hover:ease-in-out" href="/login">Login</Link>
                    <Link onClick={handleClick} className="p-3 text-lg text-white hover:text-sky-600 hover:transition-all hover:duration-300 hover:ease-in-out" href="/register">Register</Link>
                </ul>
            </div>
        </>
    );
};

export default Navbar;
