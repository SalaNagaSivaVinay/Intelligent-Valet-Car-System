import React from "react";
import { motion } from "framer-motion";

export default function MallMap({
  gatePositions,
  currentGate,
  setCurrentGate,
  vehicleRequested,
  setModalVisible,
  vehicleStatus,
  setVehicleStatus,
  setVehicleRequested,
}) {
  const gateLabels = {
    A: "Main Entrance",
    B: "Food Court",
    C: "Cinema",
    D: "Parking Garage",
  };

  return (
    <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-blue-100 transition-all duration-300">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-indigo-100 via-white to-blue-100 border-b border-indigo-200 rounded-t-2xl">
        <h2 className="text-3xl font-bold text-indigo-900">🗺️ Digital Mall Map</h2>
        <p className="text-sm text-indigo-700 mt-2">
          Smart tracking for optimized vehicle delivery.
        </p>
      </div>

      {/* Mall Map Area */}
      <div className="relative h-96 bg-gradient-to-br from-blue-50 via-white to-sky-100 rounded-md overflow-hidden">
        {/* Gate Markers */}
        {Object.entries(gatePositions).map(([gate, pos]) => (
          <div
            key={gate}
            className="absolute group cursor-pointer transition-all duration-300"
            style={{ top: pos.top, left: pos.left }}
            onClick={() => setCurrentGate(gate)}
          >
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold shadow-lg border-4 ring-2 ring-offset-2 transition-transform duration-300
              ${
                currentGate === gate
                  ? "bg-indigo-600 text-white border-indigo-800 ring-indigo-400 scale-110"
                  : "bg-white text-indigo-600 border-indigo-300 hover:scale-105"
              }`}
            >
              {gate}
            </div>
            <p className="text-sm text-gray-800 font-semibold text-center mt-1">
              {gateLabels[gate]}
            </p>

            {/* Tooltip */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 hidden group-hover:block">
              <div className="bg-black text-white text-xs rounded px-2 py-1 shadow-md">
                Select {gateLabels[gate]}
              </div>
            </div>
          </div>
        ))}

        {/* Animated Vehicle Marker */}
        {currentGate && (
          <motion.div
            className="absolute w-8 h-8 bg-green-500 rounded-full border-2 border-white shadow-xl z-30"
            style={{
              top: gatePositions[currentGate]?.top,
              left: gatePositions[currentGate]?.left,
            }}
            animate={{
              y: [0, -6, 0],
              opacity: [1, 0.9, 1],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </div>

      {/* Bottom Controls */}
      <div className="p-5 bg-white border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Info Section */}
        <div>
          <p className="text-sm text-gray-500 mb-1">Your vehicle is ready at:</p>
          <p className="text-lg font-semibold">
            Gate{" "}
            <span
              className={`px-2 py-1 rounded-md text-white text-sm font-medium transition 
                ${
                  vehicleStatus === "Delivered Successfully"
                    ? "bg-green-600"
                    : vehicleRequested
                    ? "bg-yellow-600"
                    : "bg-indigo-600"
                }`}
            >
              {currentGate || "Not Selected"}
            </span>
          </p>
        </div>

        {/* Action Button */}
        {vehicleStatus === "Delivered Successfully" ? (
          <button
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold shadow-lg transition-all"
            onClick={() => {
              setVehicleRequested(false);
              setVehicleStatus("Waiting for Request");
              setCurrentGate(null);
              setModalVisible(false);
            }}
          >
            🔁 New Request
          </button>
        ) : (
          <button
            className={`px-6 py-3 text-white rounded-xl font-semibold shadow-lg transition-all 
              ${
                vehicleRequested
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            disabled={vehicleRequested}
            onClick={() => setModalVisible(true)}
          >
            {vehicleRequested ? "⏳ In Progress" : "🚗 Request My Car"}
          </button>
        )}
      </div>
    </div>
  );
}
