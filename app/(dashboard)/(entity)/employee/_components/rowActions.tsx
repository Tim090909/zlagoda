"use client"

import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BarChart, BookOpenText, Ellipsis, Pen, Receipt, Trash } from "lucide-react"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({row}: DataTableRowActionsProps<TData>) {
    const router = useRouter();
    const handleDeleteEmployee = async (id: string) => {
        try{
            const response = await axios.delete(`/api/employee/${id}`);
            toast.success("Employee deleted");
            router.refresh();
        } catch{
            toast.error("Something went wrong!");
        }
    }
    const employee = row.original as { id: string };;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <Ellipsis className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-24 bg-white">
      <DropdownMenuItem>
          <Button variant="ghost"><Link href={`/employee/${employee.id}/full_info`} className="flex flex-row items-center"><BookOpenText className="h-3 w-3 text-slate-600 mr-2"/>Full info  </Link>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button variant="ghost"><Link href={`/employee/${employee.id}/checks`} className="flex flex-row items-center"><Receipt className="h-3 w-3 text-slate-600 mr-2"/>Checks</Link>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button variant="ghost"><Link href={`/employee/${employee.id}`} className="flex flex-row items-center"><Pen className="h-3 w-3 text-slate-600 mr-2"/>Edit  </Link>
          </Button>
          </DropdownMenuItem>
        <DropdownMenuItem>
            <Button variant="ghost" onClick={() => handleDeleteEmployee(employee.id)}>
                <Trash className="h-3 w-3 text-slate-600 mr-2"/> Delete 
            </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button variant="ghost"><Link href={`/custom_requests/nazar1/${employee.id}`} className="flex flex-row items-center"><BarChart className="h-3 w-3 text-slate-600 mr-2"/>Get stat  </Link>
          </Button>
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}