"use client"

import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BookOpenText, Ellipsis, Pen, PenTool, Trash } from "lucide-react"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
  role: string
}

export function DataTableRowActions<TData>({row, role}: DataTableRowActionsProps<TData>) {
    const router = useRouter();
    const handleDeleteCustomer = async (id: string) => {
        try{
            const response = await axios.delete(`/api/customer/${id}`);
            toast.success("Customer deleted");
            router.refresh();
        } catch{
            toast.error("Something went wrong");
        }
    }
    const customer = row.original as { id: string };;

  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <Ellipsis className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36 bg-white">
        <DropdownMenuItem>
          <Button variant="ghost"><Link href={`/customer/${customer.id}/full_info`} className="flex flex-row items-center"><BookOpenText className="h-3 w-3 text-slate-600 mr-2"/>Full info  </Link>
          </Button>
          </DropdownMenuItem>
        <DropdownMenuItem>
          <Button variant="ghost"><Link href={`/customer/${customer.id}`} className="flex flex-row items-center"><Pen className="h-3 w-3 text-slate-600 mr-2"/>Edit  </Link>
          </Button>
          </DropdownMenuItem>
        {role !== "cashier" && (<>
        <DropdownMenuItem>
            <Button variant="ghost" onClick={() => handleDeleteCustomer(customer.id)}>
                <Trash className="h-3 w-3 text-slate-600 mr-2"/> Delete 
            </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button variant="ghost"><Link href={`/custom_requests/andrii2/${customer.id}`} className="flex flex-row items-center">Similar clients</Link>
          </Button>
          </DropdownMenuItem></>)}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}