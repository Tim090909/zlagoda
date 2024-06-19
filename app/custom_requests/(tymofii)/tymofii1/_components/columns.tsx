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

export type EmployeeProduct = {
  emplId: string
  empl: string
  prodId: string
  prodName: string
  soldNumber: string
}


export const columns: ColumnDef<EmployeeProduct>[] = [
  {
    accessorKey: "emplId",
    header: () => {
      return (
        <Button
          variant="ghost"
        >
          Empl Id
          
        </Button>
      )
    },
  },
  {
    accessorKey: "empl",
    header: () => {
      return (
        <Button
          variant="ghost"
        >
          Employee
         
        </Button>
      )
    },
  },
  {
    accessorKey: "prodId",
    header: () => {
      return (
        <Button
          variant="ghost"
        >
          Prod Id
          
        </Button>
      )
    },
  },
  {
    accessorKey: "prodName",
    header: () => {
      return (
        <Button
          variant="ghost"
        >
          Prod Name
          
        </Button>
      )
    },
  },
  {
    accessorKey: "soldNumber",
    header: () => {
      return (
        <Button
          variant="ghost"
        >
          Sold Number
          
        </Button>
      )
    },
  },
 
]