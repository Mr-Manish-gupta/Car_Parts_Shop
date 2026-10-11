import React from "react";
import { Loader2 } from "lucide-react";

export const Loader: React.FC<{ text?: string }> = ({ text = "Loading DriveZone Engine..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-3">
      <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
      <p className="text-xs font-bold text-gray-400 tracking-wider uppercase">{text}</p>
    </div>
  );
};