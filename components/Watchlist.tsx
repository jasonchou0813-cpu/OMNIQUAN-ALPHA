"use client";

import { useState, useEffect } from "react";
import { Star, Play, Trash2 } from "lucide-react";

export interface WatchItem {
  symbol: string;
  assetType: string;
}

interface WatchlistProps {
  onSelect: (symbol: string, assetType: string) => void;
}

export default function Watchlist({ onSelect }: WatchlistProps) {
  const [items, setItems] = useState<WatchItem[]>([]);

  // We listen to a custom event to update watchlist across components
  useEffect(() => {
    const loadItems = () => {
      const saved = localStorage.getItem("alpha_vision_watchlist");
      if (saved) {
        try {
          setItems(JSON.parse(saved));
        } catch (e) {}
      }
    };
    
    loadItems();
    window.addEventListener("watchlist_updated", loadItems);
    return () => window.removeEventListener("watchlist_updated", loadItems);
  }, []);

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    localStorage.setItem("alpha_vision_watchlist", JSON.stringify(newItems));
    window.dispatchEvent(new Event("watchlist_updated"));
  };

  if (items.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mt-6">
      <h3 className="text-gray-400 text-sm font-medium mb-3 flex items-center gap-2 pl-2">
        <Star className="w-4 h-4 text-warning" /> 
        近期自選清單
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map((item, idx) => (
          <div 
            key={idx} 
            className="glass-panel p-3 rounded-xl border border-white/5 flex items-center justify-between group hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer" 
            onClick={() => onSelect(item.symbol, item.assetType)}
          >
            <div>
              <div className="text-[10px] text-primary bg-primary/10 px-1.5 py-0.5 rounded inline-block mb-1">
                {item.assetType.toUpperCase()}
              </div>
              <div className="font-bold text-white text-sm">{item.symbol}</div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={(e) => { e.stopPropagation(); removeItem(idx); }} 
                className="text-gray-600 hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <Play className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
