import { useEffect, useState } from "react";
import clsx from "clsx";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Download, Loader, MoveRight, QrCode, X } from "lucide-react";
import Image from "./image";
import { createQr, saveQr } from "@/utils/qr";
import { Badge } from "@/components/ui/badge";

interface WeaponCardProps {
  serial: string;
  name: string;
  type: string;
  qualities?: string[];
  price: string;
  image: string;
  onViewDetails?: (id: string | number) => void;
}

export default function WeaponCard({
  serial,
  name,
  type,
  qualities,
  image,
  onViewDetails,
}: WeaponCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [qr, setQr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const showQr = async () => {
    setIsLoading(true);
    const _qr = await createQr(serial);
    setIsLoading(false);
    setQr(_qr);
  };

  const downloadQr = async () => {
    const path = await saveQr(serial);
    console.log(`QR saved to: ${path}`); // TODO show toast
  };

  useEffect(() => {
    if (flipped) showQr();
  }, [flipped]);

  return (
    <div
      className={clsx(
        "relative overflow-hidden group w-full h-[500px]",
        "[perspective:1000px]",
      )}
    >
      {/* Border lines */}
      <>
        <div className="absolute top-0 left-0 h-12 w-[1px] bg-neutral-800/80 z-10 group-hover:bg-green-600 transition-colors" />
        <div className="absolute top-0 left-0 h-[1px] w-12 bg-neutral-800/80 z-10 group-hover:bg-green-600 transition-colors" />
        <div className="absolute top-0 right-0 h-12 w-[1px] bg-transparent z-10 group-hover:bg-green-600 transition-colors" />
        <div className="absolute top-0 right-0 h-[1px] w-12 bg-transparent z-10 group-hover:bg-green-600 transition-colors" />
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
            "bg-gradient-to-br from-neutral-950 to-stone-900 hover:from-slate-950",
          )}
        >
          <div className="flex items-center justify-between gap-4 text-neutral-500 group-hover:text-green-500 transition-colors">
            <h2 className="text-sm uppercase font-mono selection:text-green-500">
              {serial}
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
          <Image src={image} alt={name} />
          <div className="space-y-4 text-gray-200">
            <div>
              <h2 className="text-lg font-bold tracking-wide">{name}</h2>
              <p className="text-sm text-gray-500">{type}</p>
            </div>
            {qualities && qualities.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {qualities.map((quality) => (
                  <Badge variant="secondary">{quality}</Badge>
                ))}
              </div>
            ) : null}
            <button
              onClick={() => onViewDetails?.(serial)}
              className="relative w-full border p-3 bg-transparent border-green-600 text-green-400 uppercase tracking-wide text-xs overflow-hidden group/button"
            >
              <span className="relative flex items-center justify-center gap-1">
                More Details
                <MoveRight className="size-4" />
              </span>
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
          <div className="flex items-center justify-between gap-4 text-neutral-500 group-hover:text-green-500 transition-colors">
            <h2 className="text-sm uppercase font-mono selection:text-green-500">
              {serial}
            </h2>
            <Tooltip>
              <TooltipTrigger asChild>
                <X
                  className="cursor-pointer transition-colors"
                  onClick={() => setFlipped(false)}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Close</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex-1 flex items-center justify-center">
            {isLoading ? (
              <Loader className="animate-spin" />
            ) : (
              <img src={qr} alt={`QR code for ${serial}`} className="w-full" />
            )}
          </div>
          <button
            onClick={downloadQr}
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
