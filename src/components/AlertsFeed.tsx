"use client"; 
 
 import React from 'react'; 
 import { Recommendation } from '@/lib/data'; 
 import { Zap, ArrowUpRight } from 'lucide-react'; 
 import { motion, AnimatePresence } from 'framer-motion'; 
 
 interface AlertsFeedProps { 
  recommendations: Recommendation[];
  onSelect?: (id: string) => void;
  onFeedback?: (id: string, type: 'modify' | 'escalate') => void;
} 

export const AlertsFeed = ({ recommendations, onSelect, onFeedback }: AlertsFeedProps) => { 
  return ( 
    <div className="space-y-4"> 
       <div className="flex items-center justify-between mb-2"> 
         <h2 className="text-lg font-bold text-white tracking-tight">AI Recommendation Feed</h2> 
         <span className="px-2 py-0.5 bg-blue-500/10 text-blue-500 text-[10px] font-bold rounded-full border border-blue-500/20">LIVE</span> 
       </div> 
       
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
         <AnimatePresence mode="popLayout"> 
           {recommendations.map((rec, i) => ( 
             <motion.div 
               key={rec.id} 
               layout 
               initial={{ opacity: 0, scale: 0.95, y: 20 }} 
               animate={{ opacity: 1, scale: 1, y: 0 }} 
               exit={{ opacity: 0, scale: 0.95 }} 
               transition={{ delay: i * 0.1 }} 
               className="bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-5 group relative overflow-hidden" 
             > 
               <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/50" /> 
               
               <div className="flex justify-between items-start mb-4"> 
                 <div className="flex items-center gap-2"> 
                   <div className="p-2 bg-blue-500/10 rounded-lg"> 
                     <Zap className="w-4 h-4 text-blue-500" /> 
                   </div> 
                   <div> 
                     <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Issue Detected</p> 
                     <p className="text-sm font-semibold text-zinc-100">{rec.issue}</p> 
                   </div> 
                 </div> 
                 <div className="text-right"> 
                   <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Confidence</p> 
                   <p className="text-sm font-bold text-emerald-500">{rec.confidence}%</p> 
                 </div> 
               </div> 
 
               <div className="p-3 bg-zinc-800/30 rounded-xl border border-zinc-700/30 mb-5"> 
                 <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Suggested Action</p> 
                 <p className="text-xs font-medium text-zinc-200">{rec.action}</p> 
                 <div className="mt-2 flex items-center gap-2 text-[10px] font-bold text-emerald-500 uppercase tracking-tight"> 
                   <ArrowUpRight className="w-3 h-3" /> 
                   Impact: {rec.impact} 
                 </div> 
               </div> 
 
               <div className="grid grid-cols-3 gap-2"> 
                <button 
                  onClick={() => onSelect?.(rec.id)}
                  className="py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold rounded-lg transition-all shadow-lg shadow-blue-600/10"> 
                  ACCEPT 
                </button> 
                <button 
                  onClick={() => onFeedback?.(rec.id, 'modify')}
                  className="py-2 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] font-bold rounded-lg transition-all border border-zinc-700/50"> 
                  MODIFY 
                </button> 
                <button 
                  onClick={() => onFeedback?.(rec.id, 'escalate')}
                  className="py-2 px-3 bg-zinc-800 hover:bg-zinc-700 text-red-400 text-[10px] font-bold rounded-lg transition-all border border-zinc-700/50"> 
                  ESCALATE 
                </button> 
              </div> 
             </motion.div> 
           ))} 
         </AnimatePresence> 
       </div> 
     </div> 
   ); 
 };
