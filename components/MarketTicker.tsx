import { TrendingUp, TrendingDown } from "lucide-react";

export default function MarketTicker() {
  const indices = [
    { name: "加權指數", price: "21,258.47", change: "+1.2%", isUp: true },
    { name: "台積電", price: "840.00", change: "+0.5%", isUp: true },
    { name: "S&P 500", price: "5,304.72", change: "+0.1%", isUp: true },
    { name: "NASDAQ", price: "16,698.32", change: "-0.2%", isUp: false },
    { name: "SOX 費半", price: "5,024.11", change: "-1.5%", isUp: false },
    { name: "聯發科", price: "1,185.00", change: "+2.1%", isUp: true },
  ];

  return (
    <div className="w-full bg-black/40 border-b border-primary/20 backdrop-blur-md overflow-hidden flex whitespace-nowrap py-2 z-50">
      <div className="animate-marquee flex gap-12 items-center">
        {/* Duplicate the list twice for seamless marquee */}
        {[...indices, ...indices, ...indices].map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 text-sm font-medium">
            <span className="text-gray-300">{item.name}</span>
            <span className="text-white">{item.price}</span>
            <span className={`flex items-center ${item.isUp ? 'text-green-400' : 'text-danger'}`}>
              {item.isUp ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
