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
import { useCallback, useEffect, useMemo, useState } from "react";
import { getProducts } from "@/actions/get_products";
import { DataTable } from "./data-table";
import { columns } from "./columns";
//import { StoreProduct } from "./columns";

interface Customer {
    id: string;
    name: string;
    surname: string;
    phone: string;
}

export interface StoreProduct {
    upc: string;
    title: string;
    sellingPrice: number;
    productsNumber: number;
    characteristics: string;
}

interface AddFormProps{
    customers: Customer[];
    products: StoreProduct[];
}

const formSchema = z.object({
    client_id: z.string().optional(),
    products: z.object({upc: z.string(), title: z.string(), amount: z.number(), price: z.number()}).array(),
})

const AddForm = ({customers, products}: AddFormProps ) => {
    const [prodList, setProdList] = useState<StoreProduct[]>(products);
    const router = useRouter();
    const [selectedProducts, setSelectedProducts] = useState<{ upc: string, title: string, amount: number, price: number }[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            products: [],
        },
    })

    const { isSubmitting, isValid } = form.formState;

    const handleAddProduct = (product: StoreProduct) => {
        const updatedProducts = [...selectedProducts, { upc: product.upc, title: product.title, amount: 1, price: product.sellingPrice }];
        setSelectedProducts(updatedProducts);
        form.setValue("products", updatedProducts);
        const updatedProdList = prodList.filter(p => p.upc !== product.upc);
        setProdList(updatedProdList);
    };

    const handleQuantityChange = useCallback((upc: string, newAmount: number) => {
      const updatedProducts = selectedProducts.map(product =>
          product.upc === upc ? { ...product, amount: newAmount } : product
      );
      setSelectedProducts(updatedProducts);
      form.setValue('products', updatedProducts);
  }, []);

  const handleDeleteProduct = useCallback((upc: string) => {
      const updatedProducts = selectedProducts.filter(product => product.upc !== upc);
      setSelectedProducts(updatedProducts);
      form.setValue('products', updatedProducts);
      const restoredProduct = products.find(p => p.upc === upc);
      if (restoredProduct) {
          setProdList([...prodList, restoredProduct]);
      }
  }, []);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            const response = await axios.post("/api/check", values);
            router.push(`/check`);
            toast.success("Check created");
        } catch{
            toast.error("Something went wrong");
        }
    }

    const cols = useMemo(() => columns({handleQuantityChange, handleDeleteProduct}), [])
  return (
    <div className=" max-w-5xl mx-auto flex md:items-top md:justify-center gap-8 h-full p-6 ">
      <div className="w-[678px] min-h-96 border-2 rounded-xl py-4 px-6">
        <h2 className="text-xl font-semibold">Cart</h2>
        <DataTable columns={cols} data={selectedProducts}/>
      </div>
      <div className="w-96 h-96 flex justify-center items-center border-2 rounded-xl">
        <div>
        <h1 className="text-3xl font-semibold">
            Create new check
        </h1>
        <p className="text-sm text-slate-400">Choose the client and add products!</p>
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 mt-8"
            >
               <FormField
                control={form.control}
                name="client_id"
                render={({ field }) => (
                    <FormItem className="flex flex-col ">
                    <FormLabel>Client</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                                "w-[300px] justify-between ",
                                !field.value && "text-muted-foreground"
                            )}
                            >
                            {field.value
                                ? customers.find(
                                    (customer) => customer.id === field.value
                                )?.phone
                                : "Select customer"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] p-0">
                        <Command className="bg-white">
                            <CommandInput placeholder="Search product..." />
                            <CommandEmpty>No customer found.</CommandEmpty>
                            <CommandGroup>
                            {customers.map((customer) => (
                                <CommandItem
                                value={customer.phone}
                                key={customer.id}
                                onSelect={() => {
                                    form.setValue("client_id", customer.id)
                                }}
                                >
                                <Check
                                    className={cn(
                                    "mr-2 h-4 w-4",
                                    customer.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                />
                                {customer.phone + " " + customer.name + " " + customer.surname}
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
                  name="products"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Products</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn("w-[300px] justify-between", !field.value && "text-muted-foreground")}
                            >
                              {selectedProducts.length > 0
                                ? prodList.find(product => product.upc === selectedProducts[selectedProducts.length - 1].upc)?.title
                                : "Select product"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] p-0">
                          <Command className="bg-white">
                            <CommandInput placeholder="Search product..." />
                            <CommandEmpty>No product found.</CommandEmpty>
                            <CommandGroup>
                              {prodList.map((product) => (
                                <CommandItem
                                  value={product.title}
                                  key={product.upc}
                                  onSelect={() => handleAddProduct(product)}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      selectedProducts.some(p => p.upc === product.upc) ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  {product.upc + " " + product.title + " $" + product.sellingPrice + " " + product.productsNumber}
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
    </div>
  )
}

export default AddForm;