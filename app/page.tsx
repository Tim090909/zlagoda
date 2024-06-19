
import { Button } from "@/components/ui/button";
import { BookUser, CircleUserRound, Layers3, LogOut, ReceiptText, ShoppingCart, Store, User, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link";
import Logout from "./logout";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";

function getFirstLetterUpperCase(str: string | undefined): string {
  if (!str || str.length === 0) return '';
  return str.charAt(0).toUpperCase();
}

export default async function Home() {
  const session = await getServerSession(options);
  const role = session?.user.role;
  const name = session?.user.name;
  
  return (
    <div className="bg-zinc-950">
      <header className="flex justify-end items-center py-4 px-4 gap-8">
        <Logout />
        <Link href="profile">
          <Avatar>
            <AvatarFallback className="bg-slate-400">{name ? getFirstLetterUpperCase(name) : <User className="w-8 h-8"/>}</AvatarFallback>
          </Avatar>
        </Link>
      </header>
      <main className="flex flex-col items-center h-screen">
        <div className="h-72 flex justify-center items-center">
          <h1 className="text-slate-200 text-9xl">ZLAGODA</h1>
        </div>
        <div className="flex flex-wrap max-w-[800px] gap-16">
          {role !== "cashier" && (<><div className="w-56 h-48 flex flex-col items-center justify-center gap-y-8 border-2 rounded-lg border-slate-400">
            <ShoppingCart className="w-20 h-20 text-slate-300"/>
            <Link href="products"><Button variant="outline" className="text-slate-200">Manage products</Button></Link>
          </div>
          <div className="w-56 h-48 flex flex-col items-center justify-center gap-y-8 border-2 rounded-lg border-slate-400">
            <Store className="w-20 h-20 text-slate-300"/>
            <Link href="store_product"><Button variant="outline" className="text-slate-200">Manage products in shop</Button></Link>
          </div>
          <div className="w-56 h-48 flex flex-col items-center justify-center gap-y-8 border-2 rounded-lg border-slate-400">
            <Layers3 className="w-20 h-20 text-slate-300"/>
            <Link href="category"><Button variant="outline" className="text-slate-200">Manage categories</Button></Link>
          </div>
          <div className="w-56 h-48 flex flex-col items-center justify-center gap-y-8 border-2 rounded-lg border-slate-400">
            <Users className="w-20 h-20 text-slate-300"/>
            <Link href="employee"><Button variant="outline" className="text-slate-200">Manage employee</Button></Link>
          </div></>)}
          <div className="w-56 h-48 flex flex-col items-center justify-center gap-y-8 border-2 rounded-lg border-slate-400">
            <ReceiptText className="w-20 h-20 text-slate-300"/>
            <Link href="check"><Button variant="outline" className="text-slate-200">Manage checks</Button></Link>
          </div>
          <div className="w-56 h-48 flex flex-col items-center justify-center gap-y-8 border-2 rounded-lg border-slate-400">
            <BookUser className="w-20 h-20 text-slate-300"/>
            <Link href="customer"><Button variant="outline" className="text-slate-200">Manage clients</Button></Link>
          </div>
        </div>
      </main>
    </div>
  );
}
