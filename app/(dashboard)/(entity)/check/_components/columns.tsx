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
export type Check = {
  id: number;
  empl_id: string;
  cust_nam: string;
  cd: Date;
  sum: number;
  vat: number;
}


export const columns: ColumnDef<Check>[] = [{
  id: "select",
  header: ({ table }) => (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  ),
  enableSorting: false,
  enableHiding: false,
},
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
    accessorKey: "cd",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Print date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const formattedDate = new Date(row.getValue('cd')).toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }); 
      return <span>{formattedDate}</span>;
    }
  },
  {
    accessorKey: "sum",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total sum
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("sum") || "0");
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "UAH"
      }).format(price);

      return <div>{formatted}</div>
    }
  },
  {
    accessorKey: "vat",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          VAT
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("vat") || "0");
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "UAH"
      }).format(price);

      return <div>{formatted}</div>
    }
  },
  {
    accessorKey: "empl_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          
        >
          Cashier
        </Button>
      )
    },
  },
  {
    accessorKey: "cust_nam",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Client
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;

      return (
        
            <Link href={`/teacher/articles/${id}`}>
          
                <Pencil className="h-4 w-4 mr-2" />
                Edit
          
            </Link>
      
      )
    }
  }
]