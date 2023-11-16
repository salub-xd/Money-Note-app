"use client";

import { useFormik } from 'formik';
import Link from 'next/link'
import React, { useState } from 'react'
import { registerSchema } from '../../schemas/index'
import { toast } from 'react-toastify';
import { userSignup } from '@/services/userService';
import { useRouter } from 'next/navigation';
import { BiLoaderCircle } from 'react-icons/bi'

interface InitialValues {
  username: string,
  email: string,
  password: string
}
const initialValues: InitialValues = { username: "", email: "", password: "" };

export default function MyPage() {

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: registerSchema,
    onSubmit: async (values, action) => {
      try {
        // console.log(values)
        setLoading(true);
        const result = await userSignup(values);
        // console.log(result);
        toast.success('success');
        action.resetForm();
        router.push('/');
      } catch (error:any) {
        console.log(error.response.data.message);
        toast.error('error : ' + error.response.data.message, {
          position: "top-center"
        })
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <div className='flex flex-col justify-center items-center h-screen bg-gray-200'>
      <div className=' flex flex-col items-center px-5 pt-5 rounded-lg bg-white shadow-xl hover:shadow-sm sm:px-8'>
        <div className='text-2xl w-34 font-Alumni text-black border-yellow-400 border-b-4 pb-0.5'>
          SignUp Here
        </div>
        <div className=' w-64 sm:w-96 mt-4 my-2'>
          <form action="" onSubmit={handleSubmit}>
            <div className='flex flex-col my-4 sm:my-4'>
              <label className=' text-gray-700' htmlFor="username">Username</label>
              <input className='bg-gray-200 text-gray-700 my-2 p-3 rounded-lg border hover:bg-slate-100 focus:border-blue-500 focus:bg-white focus:outline-none' type="text" placeholder='Enter Username' name='username'
                value={values.username} onChange={handleChange} onBlur={handleBlur}
              />
              {errors && touched.username ? <small className='text-red-600'>{errors.username}</small> : null}
            </div>
            <div className='flex flex-col my-2 sm:my-4'>
              <label className=' text-gray-700' htmlFor="email">Email Address</label>
              <input className='bg-gray-200 text-gray-700 my-2 p-3 rounded-lg border hover:bg-slate-100 focus:border-blue-500 focus:bg-white focus:outline-none' type="email" placeholder='Enter Email Address' name='email'
                value={values.email} onChange={handleChange} onBlur={handleBlur}
              />
              {errors && touched.email ? <small className=' text-red-600'>{errors.email}</small> : null}
            </div>
            <div className='flex flex-col my-2 sm:my-4'>
              <label className=' text-gray-700' htmlFor="password">Password</label>
              <input className='bg-gray-200 text-gray-700 my-2 p-3 rounded-lg border hover:bg-slate-100 focus:border-blue-500 focus:bg-white focus:outline-none' type="password" placeholder='Enter Password' name='password'
                value={values.password} onChange={handleChange} onBlur={handleBlur}
              />
              {errors && touched.password ? <small className=' text-red-600'>{errors.password}</small> : null}
            </div>
            <div className='flex flex-col my-4 sm:my-5'>
            <button className=' flex items-center justify-center p-2 text-white bg-[#08324a] rounded-md hover:bg-[#08324a]' type='submit' >Sign Up {loading && <BiLoaderCircle className=' mx-3 animate-ping rotate-6' />}</button>
            </div>
            <div className='flex flex-col items-center my-7 sm:my-10'>
              <p className='text-gray-700 text-xs sm:text-base'>Already have account? <Link className='text-sky-600 hover:underline' href={'/signup'}>Login an account</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div >
  )
}
