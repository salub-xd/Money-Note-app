"use client";

import yup, { mixed, object, string } from 'yup';

// interface LoginSchema {
//     email: string | undefined,
//     password: string
// }

export const loginSchema = object({
    email: string().email().required(),
    password: string().min(3).max(300).required()
});

// interface RegisterSchema {
//     username: string,
//     email: string | undefined,
//     password: string
// }

export const registerSchema = object({
    username: string().min(3).max(15).required(),
    email: string().email().required(),
    password: string().min(3).max(300).required()
});

// interface AddPostSchema {
//     title?: string | undefined,
//     description: string,
//     amount: string,
//     paymentType: string,
// }

export const addPostSchema = object({
    title: string().min(3).max(30),
    description: string().min(3).max(100),
    amount: string().min(3).max(100).required(),
    paymentType: mixed()
        .oneOf(['deposit', 'withdraw'] as const)
        .defined(),
});
