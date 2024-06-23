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
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { sql } from "@/lib/db";
import { useEffect, useState } from "react";
import { getProducts } from "@/actions/get_products";

interface Product {
    id: number;
    title: string;
}

interface AddFormProps {
    products: Product[];
}

const formSchema = z.object({
    id: z.coerce.number(),
    price: z.coerce.number(),
    amount: z.coerce.number(),
    promotional: z.boolean().default(false).optional(),
})

const AddForm = ({products}: AddFormProps) => {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            promotional: false,
        },
    })

    //console.log("hefbkhqwejvbfkhqwbjelkqbwejlhje")
    //console.log(products);

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            const response = await axios.post("/api/store_product", values);
            router.push(`/store_product`);
            router.refresh();
            toast.success("Store product adeded");
        } catch{
            toast.error("Something went wrong");
        }
    }
  return (
    <div className=" max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6 mt-16">
      <div>
        <h1 className="text-3xl font-semibold">
            Add new store product
        </h1>
        <p className="text-sm text-slate-400">Add amount and price of new store product!</p>
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 mt-8"
            >
               <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                    <FormItem className="flex flex-col ">
                    <FormLabel>Product</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                                "w-[200px] justify-between ",
                                !field.value && "text-muted-foreground"
                            )}
                            >
                            {field.value
                                ? products.find(
                                    (product) => product.id === field.value
                                )?.title
                                : "Select product"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                        <Command className="bg-white">
                            <CommandInput placeholder="Search product..." />
                            <CommandEmpty>No product found.</CommandEmpty>
                            <CommandGroup>
                            {products.map((product) => (
                                <CommandItem
                                value={product.title}
                                key={product.id}
                                onSelect={() => {
                                    form.setValue("id", product.id)
                                }}
                                >
                                <Check
                                    className={cn(
                                    "mr-2 h-4 w-4",
                                    product.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                />
                                {product.title}
                                </CommandItem>
                            ))}
                            </CommandGroup>
                        </Command>
                        </PopoverContent>
                    </Popover>
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
                                Product price 
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
                    name="promotional"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Is promotional? 
                            </FormLabel> 
                            <FormControl>
                                <Checkbox
                                className="ml-4"
                                    checked={field.value}
                                    onCheckedChange={(checked) => field.onChange(checked)}
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

export default AddForm;