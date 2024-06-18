'use client';

import { signOut } from 'next-auth/react';
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function Logout() {
  return (
    <Button className="bg-slate-400" size="sm" onClick={() => {
        signOut();
      }}> Log out 
          <LogOut className='pl-2'/>
    </Button>
    
  );
}