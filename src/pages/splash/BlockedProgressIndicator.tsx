import clsx from "clsx";
import { useEffect } from "react";

interface BlockedProgressIndicatorProps {
  progress: number; // 0 to 100
  onComplete?: () => void;
}

export default function BlockedProgressIndicator({
  progress,
  onComplete,
}: BlockedProgressIndicatorProps) {
  const totalBlocks = 20;
  const filledBlocks = Math.round((progress / 100) * totalBlocks);
  const blocks = Array.from({ length: totalBlocks }, (_, i) => ({
    filled: i < filledBlocks,
    key: i,
  }));

  useEffect(() => {
    if (progress >= 100 && onComplete) {
      onComplete();
    }
  }, [progress, onComplete]);

  return (
    <div className="bg-black text-green-500 w-full max-w-md font-mono mt-4 px-2">
      <div className="relative rounded p-2">
        <p className="text-sm text-green-400">{progress}%</p>
        <div className="flex gap-0.5 justify-center">
          {blocks.map(({ filled, key }) => (
            <span
              key={key}
              className={clsx(
                "block transition-colors duration-300",
                filled ? "text-green-500" : "text-neutral-700",
              )}
            >
              █
            </span>
          ))}
        </div>
        <div className="absolute top-0 left-0 h-4 w-[1px] bg-neutral-700" />
        <div className="absolute top-0 left-0 h-[1px] w-4 bg-neutral-700" />
        <div className="absolute top-0 right-0 h-4 w-[1px] bg-neutral-700" />
        <div className="absolute top-0 right-0 h-[1px] w-4 bg-neutral-700" />
        <div className="absolute bottom-0 left-0 h-4 w-[1px] bg-neutral-700" />
        <div className="absolute bottom-0 left-0 h-[1px] w-4 bg-neutral-700" />
        <div className="absolute bottom-0 right-0 h-4 w-[1px] bg-neutral-700" />
        <div className="absolute bottom-0 right-0 h-[1px] w-4 bg-neutral-700" />
      </div>
    </div>
  );
}
