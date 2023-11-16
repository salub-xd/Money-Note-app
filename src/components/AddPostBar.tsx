"use client";
import Link from 'next/link'
import React from 'react'
import { TfiGithub } from 'react-icons/tfi'
import { BiLinkExternal } from 'react-icons/bi'

export default function AddPostBar() {
    return (
        <div className='flex flex-col items-center mt-10 bg-gray-200'>
            <div className=' flex items-center px-4 py-2 rounded-lg bg-white shadow-lg hover:shadow-xl sm:py-3  sm:px-8'>
                <div className=' pr-3 sm:pr-5'>
                    <TfiGithub className='text-black w-7 h-7  hover:text-sky-700 sm:w-10 sm:h-10' />
                </div>
                <div className=''>
                    <Link href={'/add-post'}>
                        <input className='my-1 w-44 px-1 py-1 rounded-lg border bg-gray-100 hover:bg-gray-50 sm:w-60 md:w-80 sm:my-2 sm:px-3 sm:py-2 focus:border-blue-500 focus:bg-white focus:outline-none' type="text" placeholder='Add Post' />
                    </Link>
                </div>
                <div className=' pl-3 sm:pl-5'>
                    <Link href={'/add-post'}>
                        <BiLinkExternal className='text-black w-7 h-7 hover:text-sky-700 sm:w-10 sm:h-10' />
                    </Link>
                </div>
            </div>
        </div>
    )
}
