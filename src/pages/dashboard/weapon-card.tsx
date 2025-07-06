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
  return (
    <div className="relative bg-neutral-900 overflow-hidden">
      <>
        <div className="absolute top-0 left-0 h-12 w-[1px] bg-neutral-700 z-10" />
        <div className="absolute top-0 left-0 h-[1px] w-12 bg-neutral-700 z-10" />
        <div className="absolute top-0 right-0 h-12 w-[1px] bg-neutral-700 z-10" />
        <div className="absolute top-0 right-0 h-[1px] w-12 bg-neutral-700 z-10" />
        <div className="absolute bottom-0 left-0 h-12 w-[1px] bg-neutral-700 z-10" />
        <div className="absolute bottom-0 left-0 h-[1px] w-12 bg-neutral-700 z-10" />
        <div className="absolute bottom-0 right-0 h-12 w-[1px] bg-neutral-700 z-10" />
        <div className="absolute bottom-0 right-0 h-[1px] w-12 bg-neutral-700 z-10" />
      </>
      <div className="h-64 flex flex-col justify-center px-[3vw] relative">
        <img src={image} alt={name} className="w-full h-full object-contain" />
      </div>
      <div className="p-4 space-y-4 text-gray-200">
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
          className="relative w-full border py-2 px-3 bg-transparent border-green-600 text-green-400 uppercase tracking-wide text-xs overflow-hidden group"
        >
          <span className="relative z-10">View Details</span>
          <span className="absolute inset-0 bg-green-600/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
        </button>
      </div>
    </div>
  );
}
