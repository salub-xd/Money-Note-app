"use client";

import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { FaMoneyCheckDollar } from 'react-icons/fa6'
import { BiLinkExternal, BiLoaderCircle } from 'react-icons/bi'
import { userGetPost } from '@/services/postService';
import { toast } from 'react-toastify';
// import UserContext from '@/context/userContext';

export default function PostCards() {

    // const { user }: any = useContext(UserContext);

    const [posts, setPosts] = useState<any>();

    useEffect(() => {
        async function load() {
            try {
                // if (typeof user._id === 'undefined') {
                //     console.log(user._id);
                    // const fetchedPosts = await userGetPost(user._id);
                    const fetchedPosts = await userGetPost();
                    // console.log(fetchedPosts);
                    setPosts({ ...fetchedPosts });
                // }

            } catch (error: any) {
                console.log(error);
                toast.error("error in fetching posts");
            }
        }
        load();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className='mt-12 flex flex-wrap items-center justify-center '>
            {!posts ? <BiLoaderCircle className='w-32 h-32 m-5 text-red-700 animate-ping rotate-6' /> : posts?.post?.map((postCard: any) =>
                <div key={postCard._id} className='flex flex-col items-center bg-gray-200'>
                    <div className=' flex flex-col m-4 px-4 py-3 rounded-lg bg-white shadow-lg w-64 sm:w-96 hover:shadow-xl sm:px-6'>
                        <div className=''>
                            <h1 className='text-2xl text-gray-700'>{postCard.title}</h1>
                            <p className='text-sm py-1 text-gray-700'>{postCard.description}</p>
                        </div>
                        {/* withdraw  */}
                        {postCard.paymentType === 'withdraw' && <>
                            <div className='flex py-2 items-center'>
                                <div className=' pr-3'>
                                    <FaMoneyCheckDollar className='w-10 h-10  text-red-500 hover:text-red-600' />
                                </div>
                                <small className='text-2xl text-red-500 hover:text-red-600'>{postCard.amount}<span className='text-red-400'>-</span></small>
                            </div>
                        </>}
                        {/* deposit  */}
                        {postCard.paymentType === 'deposit' && <>
                            <div className='flex py-2 items-center'>
                                <div className=' pr-3'>
                                    <FaMoneyCheckDollar className='w-10 h-10  text-green-500 hover:text-green-600' />
                                </div>
                                <small className='text-2xl text-green-500 hover:text-green-600'>{postCard.amount}<span className='text-green-400'>+</span></small>
                            </div>
                        </>}
                    </div>
                </div>

            )}
        </div>
    )
}
