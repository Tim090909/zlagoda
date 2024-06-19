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

interface Customer{
    id: string,
    name: string,
    surname: string,
    patronimic: string,
    percent: number,
    phone: string,
    city: string,
    street: string,
    zip_code: string
}

interface CustomerProps{
    customer: Customer,
}

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required"
    }),
    surname: z.string().min(1, {
        message: "Surname is required"
    }),
    patronimic: z.string(),
    percent: z.coerce.number(),
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
    })
})

const CustomerForm = ({customer}: CustomerProps) => {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: customer.name,
            surname: customer.surname,
            patronimic: customer.patronimic || "",
            percent: customer.percent || 20,
            phone: customer.phone,
            city: customer.city,
            street: customer.street,
            zip_code: customer.zip_code
        },
    })

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            const response = await axios.patch(`/api/customer/${customer.id}`, values);
            router.push(`/customer`);
            router.refresh();
            toast.success("Customer edited");
        } catch{
            toast.error("Something went wrong");
        }
    }
  return (
    <div className=" max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6 mt-16">
      <div>
        <h1 className="text-3xl font-semibold">
            Edit customer
        </h1>
        <p className="text-sm text-slate-400">Edit info about customer!</p>
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
              name="percent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isSubmitting}
                      placeholder="e.g. 5"
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
                <div className="flex items-center gap-x-2">
                    <Link href="/customer">
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
                        Save
                    </Button>
                </div>
            </form>
        </Form>
      </div>
    </div>
  )
}

export default CustomerForm