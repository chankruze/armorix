import { useState } from "react";
import clsx from "clsx";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Download, QrCode, X } from "lucide-react";

interface WeaponCardProps {
  id: string | number;
  name: string;
  type: string;
  quality: string;
  price: string;
  image: string;
  onViewDetails?: (id: string | number) => void;
}

export default function WeaponCard({
  id,
  name,
  type,
  quality,
  price,
  image,
  onViewDetails,
}: WeaponCardProps) {
  const [flipped, setFlipped] = useState(false);

  const saveQrCode = () => {
    console.log(`Saving QR code for ${id}`);
  };

  return (
    <div
      className={clsx(
        "relative  overflow-hidden group w-full h-[500px]",
        "[perspective:1000px]",
      )}
    >
      {/* Border lines */}
      <>
        <div className="absolute top-0 left-0 h-12 w-[1px] bg-neutral-700 z-10 group-hover:bg-green-600 transition-colors" />
        <div className="absolute top-0 left-0 h-[1px] w-12 bg-neutral-700 z-10 group-hover:bg-green-600 transition-colors" />
        <div className="absolute top-0 right-0 h-12 w-[1px] bg-neutral-700 z-10 group-hover:bg-green-600 transition-colors" />
        <div className="absolute top-0 right-0 h-[1px] w-12 bg-neutral-700 z-10 group-hover:bg-green-600 transition-colors" />
        {/* <div className="absolute bottom-0 left-0 h-12 w-[1px] bg-neutral-700 z-10 group-hover:bg-green-600 transition-colors duration-750" />
        <div className="absolute bottom-0 left-0 h-[1px] w-12 bg-neutral-700 z-10 group-hover:bg-green-600 transition-colors duration-750" />
        <div className="absolute bottom-0 right-0 h-12 w-[1px] bg-neutral-700 z-10 group-hover:bg-green-600 transition-colors duration-1000" />
        <div className="absolute bottom-0 right-0 h-[1px] w-12 bg-neutral-700 z-10 group-hover:bg-green-600 transition-colors duration-1000" /> */}
      </>

      <div
        className={clsx(
          "relative w-full h-full transition-transform duration-500",
          "[transform-style:preserve-3d]",
          flipped && "[transform:rotateY(180deg)]",
        )}
      >
        {/* Front side */}
        <div
          className={clsx(
            "absolute w-full h-full flex flex-col justify-between p-4",
            "[backface-visibility:hidden]",
            "bg-neutral-900",
          )}
        >
          <div className="flex items-center justify-between gap-4 text-neutral-500 group-hover:text-green-500 transition-colors">
            <h2 className="text-sm uppercase font-mono selection:text-green-500">
              {id}
            </h2>
            <Tooltip>
              <TooltipTrigger asChild>
                <QrCode
                  className="cursor-pointer"
                  onClick={() => setFlipped(true)}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Show QR code</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex flex-col justify-center relative">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="space-y-4 text-gray-200">
            <div>
              <h2 className="text-lg font-bold tracking-wide">{name}</h2>
              <p className="text-sm text-gray-500">{type}</p>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="bg-red-600/20 text-red-400 px-2 py-1 uppercase tracking-wider border border-red-600">
                {quality}
              </span>
              <span className="bg-blue-600/20 text-blue-400 px-2 py-1 uppercase tracking-wider border border-blue-600">
                {price}
              </span>
            </div>
            <button
              onClick={() => onViewDetails?.(id)}
              className="relative w-full border p-3 bg-transparent border-green-600 text-green-400 uppercase tracking-wide text-xs overflow-hidden group/button"
            >
              <span className="relative">View Details</span>
              <span className="absolute inset-0 bg-green-600/20 transform -translate-x-full group-hover/button:translate-x-0 transition-transform duration-300 ease-in-out" />
            </button>
          </div>
        </div>

        {/* Back side */}
        <div
          className={clsx(
            "absolute w-full h-full flex flex-col p-4",
            "[backface-visibility:hidden]",
            "[transform:rotateY(180deg)]",
            "bg-neutral-900",
          )}
        >
          <div className="flex items-center justify-between gap-4 text-neutral-500 group-hover:text-green-500">
            <h2 className="text-sm uppercase font-mono selection:text-green-500">
              {id}
            </h2>
            <Tooltip>
              <TooltipTrigger asChild>
                <X
                  className="cursor-pointer transition-colors"
                  onClick={() => setFlipped(false)}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Show QR code</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex-1 flex items-center">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?data=WeaponID:${id}&size=150x150`}
              alt={`QR code for ${id}`}
              className="w-full"
            />
          </div>
          <button
            onClick={saveQrCode}
            className="relative w-full border p-3 bg-transparent border-green-600 text-green-400 uppercase tracking-wide text-xs overflow-hidden group/button"
          >
            <span className="relative flex items-center justify-center gap-1">
              <Download className="size-4" />
              Save
            </span>
            <span className="absolute inset-0 bg-green-600/20 transform -translate-x-full group-hover/button:translate-x-0 transition-transform duration-300 ease-in-out" />
          </button>
        </div>
      </div>
    </div>
  );
}
