"use client"; 
 
 import React from 'react';
import { Search, Bell, Settings, User } from 'lucide-react'; 
 
 interface HeaderProps { 
   role: 'Station Ops' | 'Control Center Admin'; 
 } 
 
 export const AdminHeader = ({ role }: HeaderProps) => { 
    return ( 
       <header className="h-20 bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-8 sticky top-0 z-50"> 
           <div className="flex items-center gap-6 flex-1"> 
             <div className="relative w-96 group"> 
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" /> 
               <input 
                 type="text" 
                 placeholder="Search station, charger, ticket..." 
                 className="w-full bg-muted/50 border border-border rounded-xl py-2 pl-10 pr-4 text-sm text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all" 
               /> 
             </div> 
           </div> 
 
           <div className="flex items-center gap-6"> 

 
             <div className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 border border-border rounded-full"> 
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> 
               <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{role}</span> 
             </div> 
 
             <div className="flex items-center gap-4"> 
               <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors group"> 
                 <Bell className="w-5 h-5" /> 
                 <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-[10px] font-bold text-white rounded-full flex items-center justify-center border-2 border-background group-hover:scale-110 transition-transform"> 
                   3 
                 </span> 
               </button> 
               
               <button className="p-2 text-muted-foreground hover:text-foreground transition-colors"> 
                 <Settings className="w-5 h-5" /> 
               </button> 
 
               <div className="h-8 w-px bg-border mx-2" /> 
 
               <div className="flex items-center gap-3 pl-2"> 
                 <div className="text-right hidden sm:block"> 
                   <p className="text-sm font-semibold text-foreground">Alex Rivera</p> 
                   <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">ID: #4092-SW</p> 
                 </div> 
                 <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center border border-primary-foreground/10 shadow-lg"> 
                   <User className="w-6 h-6 text-primary-foreground" /> 
                 </div> 
               </div> 
             </div> 
           </div> 
       </header> 
 
   ); 
 };
