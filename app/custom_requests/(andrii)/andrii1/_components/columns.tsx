"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button";

export type Customer = {
  id: string
  name: string
  surname: string
  prodNumber: string
}

export const columns: ColumnDef<Customer>[] = [
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
  {
    accessorKey: "prodNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
        >
          Products Number
          
        </Button>
      )
    },
    
  },
 
]