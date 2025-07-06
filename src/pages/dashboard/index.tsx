import { weapons } from "./weapons";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#111] to-[#222] text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Weapon Inventory</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {weapons.map((weapon) => (
          <div
            key={weapon.id}
            className="relative bg-[#1f1f1f] border border-gray-700 rounded-xl shadow-md overflow-hidden hover:scale-[1.02] transition-transform"
          >
            <img
              src={weapon.image}
              alt={weapon.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 flex flex-col">
              <h2 className="text-lg font-semibold">{weapon.name}</h2>
              <p className="text-sm text-gray-400 mb-2">{weapon.type}</p>

              <div className="flex justify-between items-center text-xs mb-2">
                <span className="bg-green-600 px-2 py-0.5 rounded-full">
                  {weapon.quality}
                </span>
                <span className="bg-gray-700 px-2 py-0.5 rounded-full">
                  {weapon.price}
                </span>
              </div>

              <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-2">
                <div className="w-3/4 h-full bg-green-500"></div>
              </div>

              <button className="mt-auto bg-green-600 hover:bg-green-700 text-white rounded-md py-1.5 text-sm font-medium transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
