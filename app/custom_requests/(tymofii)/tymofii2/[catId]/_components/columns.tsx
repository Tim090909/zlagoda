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

export type Employee = {
  id: string
  name: string
  surname: string
}


export const columns: ColumnDef<Employee>[] = [
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
        >
          Name
         
        </Button>
      )
    },
  },
  {
    accessorKey: "surname",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
        >
          Surname
          
        </Button>
      )
    },
  },
 
]