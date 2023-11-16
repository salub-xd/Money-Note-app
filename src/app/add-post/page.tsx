"use client";
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { addPostSchema } from '../../schemas/index';
import { userAddPost } from '@/services/postService';
import { toast } from 'react-toastify';
import { BiLoaderCircle } from 'react-icons/bi';
// import UserContext from '@/context/userContext';

interface InitialValues {
  title?: string,
  description?: string,
  amount: string,
  paymentType: string,
  // userId: string,
}
const initialValues: InitialValues = { title: "", description: "", amount: "", paymentType: "none" };

// const [myValue,setMyValue] = useState<object>({email:"",password:""});
export default function AddPost() {

  // const { user }: any = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: addPostSchema,
    onSubmit: async (values, action) => {
      try {
        setLoading(true);
        const result = await userAddPost(values);
        // console.log(result);
        toast.success('success');
        action.resetForm();
      } catch (error: any) {
        console.log(values)
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
    <div className='flex flex-col items-center justify-center h-screen pt-16 bg-gray-200'>
      <div className=' flex flex-col items-center px-6 pt-5 rounded-lg bg-white shadow-xl hover:shadow-sm sm:px-8'>
        <div className='text-2xl w-36 font-Alumni text-black border-yellow-400 border-b-4 pb-0.5'>
          Add Post Here
        </div>
        <div className=' w-64 sm:w-96 mt-4 my-2'>
          <form action="" onSubmit={handleSubmit}>
            <div className='flex flex-col my-4 sm:my-4'>
              <label className=' text-gray-700' htmlFor="title">Title</label>
              <input className='bg-gray-200 text-gray-700 my-2 p-3 rounded-lg border hover:bg-slate-100 focus:border-blue-500 focus:bg-white focus:outline-none' type="text" placeholder='Enter Title' name='title'
                value={values.title} onChange={handleChange} onBlur={handleBlur}
              />
              {errors && touched.title ? <small className='text-red-600'>{errors.title}</small> : null}
            </div>
            <div className='flex flex-col my-2 sm:my-4'>
              <label className=' text-gray-700' htmlFor="description">Description</label>
              <input className='bg-gray-200 text-gray-700 my-2 p-3 rounded-lg border hover:bg-slate-100 focus:border-blue-500 focus:bg-white focus:outline-none' type="text" placeholder='Enter Description' name='description'
                value={values.description} onChange={handleChange} onBlur={handleBlur}
              />
              {errors && touched.description ? <small className='text-red-600'>{errors.description}</small> : null}
            </div>
            <div className='flex flex-col my-2 sm:my-4'>
              <label className=' text-gray-700' htmlFor="amount">Amount</label>
              <input className='bg-gray-200 text-gray-700 my-2 p-3 rounded-lg border hover:bg-slate-100 focus:border-blue-500 focus:bg-white focus:outline-none' type="text" placeholder='Enter Amount' name='amount'
                value={values.amount} onChange={handleChange} onBlur={handleBlur}
              />
              {errors && touched.amount ? <small className='text-red-600'>{errors.amount}</small> : null}
            </div>
            <div className='flex flex-col my-2 sm:my-4'>
              <label
                htmlFor="paymentType"
                className="block text-sm font-medium mb-2"
              >
                Payment Type
              </label>
              <select
                id="task_status"
                className="p-3 rounded-lg text-gray-700 bg-gray-200 hover:bg-slate-100 focus:border-blue-500 focus:bg-white focus:outline-none border"
                name="paymentType"
                onChange={handleChange}
                value={values.paymentType}
              >
                <option value="none" disabled>
                  ---Select Status---
                </option>
                <option value="deposit">Deposit</option>
                <option value="withdraw">Withdraw</option>
              </select>
              {errors && touched.paymentType ? <small className='text-red-600'>{errors.paymentType}</small> : null}
            </div>
            <div className='flex flex-col mb-8 mt-4 sm:mb-10'>
              <button className=' flex items-center justify-center p-2 text-white bg-[#08324a] rounded-md hover:bg-[#08324a]' type='submit' >Add Post {loading && <BiLoaderCircle className=' mx-3 animate-ping rotate-6' />}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
