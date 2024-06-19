"use client"

import Link from "next/link";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";

import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),
    category_id: z.coerce.number(),
    characteristics: z.string().min(2, {
        message: "Characteristics is required"
    })
})

interface Category {
    id: number;
    title: string;
}

export type Product = {
  id: number
  title: string
  categoryId: number 
  characteristics: string
}


interface FormProps {
    categories: Category[];
    product: Product;
}

const ProductForm = ({product, categories} : FormProps) => {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: product.title,
            category_id: product.categoryId,
            characteristics: product.characteristics
        },
    })

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            const response = await axios.patch(`/api/products/${product.id}`, values);
            router.push(`/products`);
            router.refresh();
            toast.success("Product edited");
        } catch{
            toast.error("Something went wrong");
        }
    }
  return (
    <div className=" max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6 mt-16">
      <div>
        <h1 className="text-3xl font-semibold">
            Edit product
        </h1>
        <p className="text-sm text-slate-400">Edit title, category and characteristics of product!</p>
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
                    name="category_id"
                    render={({field}) => (
                        <FormItem className="flex flex-col gap-3">
                           <FormLabel>
                                Category
                            </FormLabel> 
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
                                ? categories.find(
                                    (category) => category.id === field.value
                                )?.title
                                : "Select category"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                        <Command className="bg-white">
                            <CommandInput placeholder="Search category..." />
                            <CommandEmpty>No category found.</CommandEmpty>
                            <CommandGroup>
                            {categories.map((category) => (
                                <CommandItem
                                value={category.title}
                                key={category.id}
                                onSelect={() => {
                                    form.setValue("category_id", category.id)
                                }}
                                >
                                <Check
                                    className={cn(
                                    "mr-2 h-4 w-4",
                                    category.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                />
                                {"(" + category.id + ") " + category.title}
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
                    name="characteristics"
                    render={({field}) => (
                        <FormItem>
                           <FormLabel>
                                Product characteristics
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
                        Save
                    </Button>
                </div>
            </form>
        </Form>
      </div>
    </div>
  )
}

export default ProductForm