import { createProductsTable } from "@/actions/create_products_table";
import { Button } from "@/components/ui/button";
import { BookUser, Layers3, LogOut, ReceiptText, ShoppingCart, Store, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  //const cpt = createProductsTable()
  return (
    <div className="bg-zinc-950">
      <header className="flex justify-end items-center py-4 px-4 gap-8">
        <Link href="/">
          <Button className="bg-slate-400" size="sm">Log out 
            <LogOut/>
          </Button>
        </Link>
        <Link href="profile">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>H</AvatarFallback>
          </Avatar>
        </Link>
      </header>
      <main className="flex flex-col items-center h-screen">
        <div className="h-72 flex justify-center items-center">
          <h1 className="text-slate-200 text-9xl">ZLAGODA</h1>
        </div>
        <div className="flex flex-wrap max-w-[800px] gap-16">
          <div className="w-56 h-48 flex flex-col items-center justify-center gap-y-8 border-2 rounded-lg border-slate-400">
            <ShoppingCart className="w-20 h-20 text-slate-300"/>
            <Link href="products"><Button variant="outline" className="text-slate-200">Manage products</Button></Link>
          </div>
          <div className="w-56 h-48 flex flex-col items-center justify-center gap-y-8 border-2 rounded-lg border-slate-400">
            <Store className="w-20 h-20 text-slate-300"/>
            <Link href="products_in_shop"><Button variant="outline" className="text-slate-200">Manage products in shop</Button></Link>
          </div>
          <div className="w-56 h-48 flex flex-col items-center justify-center gap-y-8 border-2 rounded-lg border-slate-400">
            <ReceiptText className="w-20 h-20 text-slate-300"/>
            <Link href="checks"><Button variant="outline" className="text-slate-200">Manage checks</Button></Link>
          </div>
          <div className="w-56 h-48 flex flex-col items-center justify-center gap-y-8 border-2 rounded-lg border-slate-400">
            <BookUser className="w-20 h-20 text-slate-300"/>
            <Link href="clients"><Button variant="outline" className="text-slate-200">Manage clients</Button></Link>
          </div>
          <div className="w-56 h-48 flex flex-col items-center justify-center gap-y-8 border-2 rounded-lg border-slate-400">
            <Layers3 className="w-20 h-20 text-slate-300"/>
            <Link href="category"><Button variant="outline" className="text-slate-200">Manage categories</Button></Link>
          </div>
          <div className="w-56 h-48 flex flex-col items-center justify-center gap-y-8 border-2 rounded-lg border-slate-400">
            <Users className="w-20 h-20 text-slate-300"/>
            <Link href="workers"><Button variant="outline" className="text-slate-200">Manage workers</Button></Link>
          </div>
        </div>
      </main>
    </div>
  );
}
