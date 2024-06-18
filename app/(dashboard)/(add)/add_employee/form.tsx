"use client"

import Link from "next/link";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger ,SelectValue } from "@/components/ui/select";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required"
    }),
    surname: z.string().min(1, {
        message: "Surname is required"
    }),
    patronimic: z.string(),
    role: z.enum(['cashier', 'manager']),
    salary: z.coerce.number(),
    dob: z.string().date(),
    dos: z.string().date(),
    phone: z.string().min(13, {
        message: "Phone with code is required"
    }),
    city: z.string().min(1, {
        message: "City is required"
    }),
    street: z.string().min(1, {
        message: "Street is required"
    }),
    zip_code: z.string().min(1, {
        message: "Zip code is required"
    }),
    login: z.string().min(1, {
        message: "login is required"
    }),
})

const AddEmployeeForm = () => {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            patronimic: ""
        },
    })

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            const response = await axios.post("/api/employee", values);
            router.push(`/employee`);
            toast.success("Employee adeded");
        } catch{
            toast.error("Something went wrong");
        }
    }
  return (
    <div className=" max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6 mt-16">
      <div>
        <h1 className="text-3xl font-semibold">
            Add new employee
        </h1>
        <p className="text-sm text-slate-400">Add info about new emploee!</p>
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-6 "
            >
                <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. John"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Surname</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. Doe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="patronimic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patronimic</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. Ivanovich"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} {...field}
                    disabled={isSubmitting}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white">
                  <SelectItem value="cashier">Cashier</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                </SelectContent>
              </Select>
               
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isSubmitting}
                      placeholder="e.g. 50000"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Start</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. +1234567890123"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. New York"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 123 Main St"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zip_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip codet</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 123 Main St"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="login"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Login</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. body"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
                <div className="flex items-center gap-x-2">
                    <Link href="/employee">
                        <Button
                            type="button"
                            variant="ghost"
                        >
                            Cancel
                        </Button>
                    </Link>
                    <Button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                    >
                        Continue
                    </Button>
                </div>
            </form>
        </Form>
      </div>
    </div>
  )
}

export default AddEmployeeForm