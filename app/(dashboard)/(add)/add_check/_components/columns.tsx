"use client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Trash } from "lucide-react"

import { Button } from "@/components/ui/button";

export type CartProduct = {
  upc: string;
  title: string;
  price: number;
  amount: number;
}

interface CheckColumnsProps {
  handleQuantityChange: (upc: string, newAmount: number) => void;
  handleDeleteProduct: (upc: string) => void;
}

export const columns = ({ handleQuantityChange, handleDeleteProduct }: CheckColumnsProps): ColumnDef<CartProduct>[] => [
  {
    accessorKey: "upc",
    header: ({ column }) => {
      return (
        <p>UPC</p>
      )
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },

  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price") || "0");
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "UAH"
      }).format(price);

      return <div>{formatted}</div>
    }
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
        <p>Amount</p>
    ),
    cell: ({ row }) => (
        <div className="flex items-center">
            <input
                type="number"
                value={row.original.amount}
                onChange={e => handleQuantityChange(row.original.upc, parseInt(e.target.value))}
                className="w-12 text-center"
            /> 
        </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (<Button variant="ghost" onClick={() => handleDeleteProduct(row.original.upc)}><Trash className="w-4 h-4"/></Button>)
  }


 
]