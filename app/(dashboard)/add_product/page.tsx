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

const formSchema = z.object({
    title: z.string().min(1, {
        message: "title is required"
    }),
    amount: z.coerce.number(),
    status: z.string(),
    price: z.coerce.number(),
})

const CreatePage = () => {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            amount: 0,
            status: "available",
            price: 0,
        },
    })

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            const response = await axios.post("/api/products", values);
            router.push(`/products`);
            toast.success("Product adeded");
        } catch{
            toast.error("Something went wrong");
        }
    }
  return (
    <div className=" max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6 mt-16">
      <div>
        <h1 className="text-3xl font-semibold">
            Add new product
        </h1>
        <p className="text-sm text-slate-400">Add title, amount, set status and set the price of new product!</p>
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 mt-8"
            >
                <FormField 
                    control={form.control}
                    name="title"
                    render={({field}) => (
                        <FormItem>
                           <FormLabel>
                                Product title 
                            </FormLabel> 
                            <FormControl>
                                <Input
                                    disabled={isSubmitting}
                                    placeholder="e.g. 'Eggs'"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="amount"
                    render={({field}) => (
                        <FormItem>
                           <FormLabel>
                                Product amount 
                            </FormLabel> 
                            <FormControl>
                                <Input
                                    type="number"
                                    disabled={isSubmitting}
                                    placeholder="e.g. 100"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="status"
                    render={({field}) => (
                        <FormItem>
                           <FormLabel>
                                Product status
                            </FormLabel> 
                            <FormControl>
                                <Input
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
                    name="price"
                    render={({field}) => (
                        <FormItem>
                           <FormLabel>
                                Product prise 
                            </FormLabel> 
                            <FormControl>
                                <Input
                                    type="number"
                                    disabled={isSubmitting}
                                    placeholder="e.g. 100$"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex items-center gap-x-2">
                    <Link href="/products">
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

export default CreatePage