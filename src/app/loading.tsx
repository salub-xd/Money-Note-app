import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export default function loading() {
    return (
        <div className='flex flex-col items-center justify-center h-screen bg-gray-200 text-black'>
            <AiOutlineLoading3Quarters className='w-36 h-36 text-red-700 animate-ping rotate-6' />
        </div>
    )
}
