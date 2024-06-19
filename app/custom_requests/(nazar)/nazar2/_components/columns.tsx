"use client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react"
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox"
//import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
export type Product = {
  id: string
  title: string
  characteristics: string
}


export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          
        >
          ID
          
        </Button>
      )
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
         
        >
          Title
          
        </Button>
      )
    },
  },
  
  {
    accessorKey: "characteristics",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          
        >
          Characteristics
          
        </Button>
      )
    },
  },
 
]