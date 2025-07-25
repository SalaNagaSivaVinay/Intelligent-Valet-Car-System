import { ShieldCheck, Signal, CarFront, Clock4 } from "lucide-react";

export default function TechnologyCard() {
  const features = [
    {
      title: "Secure Parking",
      desc: "Vehicles are securely stored with 24/7 surveillance and automated locking systems.",
      icon: <ShieldCheck className="h-6 w-6 text-blue-600 group-hover:scale-125 transition-transform duration-300" />,
    },
    {
      title: "Intelligent Tracking",
      desc: "Bluetooth, WiFi, and real-time location data help predict when you’re heading out.",
      icon: <Signal className="h-6 w-6 text-green-600 group-hover:scale-125 transition-transform duration-300" />,
    },
    {
      title: "Automated Dispatch",
      desc: "Your vehicle begins heading toward the gate before you even arrive.",
      icon: <CarFront className="h-6 w-6 text-indigo-600 group-hover:scale-125 transition-transform duration-300" />,
    },
    {
      title: "Fast Delivery",
      desc: "Your vehicle is ready within 2–3 minutes, ensuring minimal wait time at the gate.",
      icon: <Clock4 className="h-6 w-6 text-yellow-600 group-hover:scale-125 transition-transform duration-300" />,
    },
  ];

  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all hover:shadow-2xl duration-300">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-400 text-white">
        <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
        <p className="text-sm opacity-90 mt-1">Experience next-gen smart parking solutions</p>
      </div>

      {/* Feature Cards */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {features.map((f, idx) => (
          <div
            key={idx}
            className="group flex items-start p-5 bg-white rounded-xl border border-gray-200 hover:shadow-md hover:border-blue-300 transition duration-300"
          >
            <div className="flex items-center justify-center h-12 w-12 bg-blue-50 border border-blue-100 rounded-full mr-4 shadow-sm">
              {f.icon}
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-800">{f.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
