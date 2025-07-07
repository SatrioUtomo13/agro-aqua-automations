'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { User, Mail, Lock, Leaf, Fish } from "lucide-react";
import { toast } from 'sonner'

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters")
})

const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password confirmation is required"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
})

type LoginFormData = z.infer<typeof loginSchema>
type RegisterFormData = z.infer<typeof registerSchema>

const AuthForm = () => {

    const loginForm = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const registerForm = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    })

    const handleLogin = (data: LoginFormData) => {
        console.log("Login attempt:", data);
        toast("Login Attempt", {
            description: `Attempting to login with email: ${data.email}`
        })
    }

    const handleRegister = (data: RegisterFormData) => {
        console.log("Register attempt:", data);
        toast("Registration Attempt", {
            description: `Creating account for: ${data.name}`
        })

    }
    return (
        <section className='w-full max-w-md'>
            <div className='text-center mb-8'>
                <div className='flex items-center justify-center gap-2 mb-4'>
                    <Leaf className='w-8 h-8 text-green-600' />
                    <Fish className='w-8 h-8 text-blue-600' />
                </div>
                <h1 className='text-3xl font-bold text-gray-800 mb-2'>
                    AgroSmart
                </h1>
                <p className='text-gray-600'>
                    Smart solutions for modern farming and fishery
                </p>
            </div>

            <Tabs defaultValue='login' className='w-full'>
                <TabsList className='grid w-full grid-cols-2'>
                    <TabsTrigger value='login'>Login</TabsTrigger>
                    <TabsTrigger value='register'>Register</TabsTrigger>
                </TabsList>

                <TabsContent value='login'>
                    <Card>
                        <CardHeader>
                            <CardTitle className='flex items-center gap-2'>
                                <User className='w-5 h-5' />
                                Welcome Back
                            </CardTitle>
                            <CardDescription>
                                Sign in to your AgroSmart account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...loginForm}>
                                <form onSubmit={loginForm.handleSubmit(handleLogin)} className='space-y-4'>
                                    <FormField
                                        control={loginForm.control}
                                        name='email'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <div className='relative'>
                                                        <Mail className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                                                        <Input
                                                            placeholder='Enter your email'
                                                            className='pl-10'
                                                            {...field}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={loginForm.control}
                                        name='password'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <div className='relative'>
                                                        <Lock className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                                                        <Input
                                                            placeholder='Enter your email'
                                                            className='pl-10'
                                                            {...field}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button type='submit' className='w-full'>
                                        Sign In
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value='register'>
                    <Card>
                        <CardHeader>
                            <CardTitle className='flex items-center gap-2'>
                                <User className='w-5 h-5' />
                                Create Account
                            </CardTitle>
                            <CardDescription>
                                Join AgroSmart to manage your farm and fishery
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...registerForm}>
                                <form onSubmit={registerForm.handleSubmit(handleRegister)} className='space-y-4'>
                                    <FormField
                                        control={registerForm.control}
                                        name='name'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Full Name</FormLabel>
                                                <FormControl>
                                                    <div className='relative'>
                                                        <User className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                                                        <Input
                                                            placeholder='Enter your full name'
                                                            className='pl-10'
                                                            {...field}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={registerForm.control}
                                        name='email'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <div className='relative'>
                                                        <Mail className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                                                        <Input
                                                            placeholder='Enter your email'
                                                            className='pl-10'
                                                            {...field}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={registerForm.control}
                                        name='password'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <div className='relative'>
                                                        <Lock className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                                                        <Input
                                                            type='password'
                                                            placeholder='Create a password'
                                                            className='pl-10'
                                                            {...field}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={registerForm.control}
                                        name='confirmPassword'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm Password</FormLabel>
                                                <FormControl>
                                                    <div className='relative'>
                                                        <Lock className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                                                        <Input
                                                            type='password'
                                                            placeholder='Confirm your password'
                                                            className='pl-10'
                                                            {...field}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button type='submit' className='w-full'>
                                        Create Account
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </section>
    )
}

export default AuthForm
