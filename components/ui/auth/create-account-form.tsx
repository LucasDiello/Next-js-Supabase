"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const formSchema = z.object({
  email: z.string({ required_error: "Email is required." }).email({ message: "Invalid email" }),
    password: z.string({ required_error: "Password is required." }).min(8, { message: "Password must be at least 8 characters long." }).max(12, { message: "Password must be at most 12 characters long." }),
})

export default function CreateAccountForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        email: "",
        password: "",
        },
  })

  const onSubmit = async (values : z.infer<typeof formSchema>) => {
    console.log(values)
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-2">
        <span className="text-lg">You will love it</span>
        <Form {...form}>
            <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-2">
                <FormField
                control={form.control}
                name="email"
                render={({field}) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input
                        placeholder="Email"
                        {...field}
                        /> 
                    </FormControl>
                    <FormDescription>
                        This is the email you will use to login
                    </FormDescription>
                    </FormItem>
                )
                }
                />
                                <FormField
                control={form.control}
                name="email"
                render={({field}) => (
                    <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input
                        placeholder="Password"
                        {...field}
                        /> 
                    </FormControl>
                    <FormDescription>
                        This is the Password you will use to login
                    </FormDescription>
                    </FormItem>
                )
                }
                />
                <Button type="submit">Create Account</Button>
            </form>
        </Form>
    </div>
  )
}
