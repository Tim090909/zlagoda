"use client"

import { Input } from '@/components/ui/input'
import React from 'react'
import {signIn} from "next-auth/react"



import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
//import { useRouter } from 'next/navigation'
import { useRouter } from 'next/router'

const FormSchema = z.object({
  username: z.string().min(1, {
    message: "Enter your Username!",
  }),
  password: z.string().min(1, {
    message: "Enter your Password!",
  }),
})



const LoginForm = () => {
    const router = useRouter();
    //const route = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: '',
            password: '',
        },
      })
    
      const onSubmit = async (data: z.infer<typeof FormSchema>) => {/*
        const callbackUrl = Array.isArray(router.query.callbackUrl)
      ? router.query.callbackUrl[0]
      : router.query.callbackUrl;

        const response = await signIn('credentials', {
          username: data.username,
          password: data.password,
          redirect: false
        });
    
        console.log({ response });*/
    /*
        if (!response?.error) {
          router.push('/');
          router.refresh();
        }*/
      };
    
  return (
    <>
    <div className='bg-slate-800 h-screen w-screen flex justify-center items-center'>
        <div className='w-96 h-96 p-8 border-2 rounded-2xl text-slate-300'>
            <h1 className='text-3xl font-semibold pb-6'>Login</h1>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
                <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                        <Input className='text-slate-900' placeholder="Enter your username" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input className='text-slate-900' placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" className='bg-slate-200 text-slate-900'>Submit</Button>
            </form>
        </Form>
    
        </div>
    </div>
    </>
  )
}

export default LoginForm