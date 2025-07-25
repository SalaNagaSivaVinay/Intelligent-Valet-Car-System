// App.jsx
import { useEffect, useRef, useState } from "react";
import InteractiveMallMap from "./components/InteractiveMallMap";
import BookingStatusCard from "./components/BookingStatusCard";
import TechStackCard from "./components/TechStackCard";
import BookingConfirmation from "./components/BookingConfirmation";

export default function App() {
  const gates = ["A", "B", "C", "D"];
  const gatePositions = {
    A: { top: 40, left: 40 },
    B: { top: 60, left: 300 },
    C: { top: 200, left: 120 },
    D: { top: 180, left: 400 },
  };

  const [currentGate, setCurrentGate] = useState("A");
  const [confidence, setConfidence] = useState(75);
  const [vehicleRequested, setVehicleRequested] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [vehicleStatus, setVehicleStatus] = useState("Parked in secure location");
  const [lastUpdate, setlastUpdate] = useState(null);
  const [timeSinceUpdate, setTimeSinceUpdate] = useState(0);
  const [userPosition, setUserPosition] = useState({ x: 0, y: 0 });
  const [estimatedArrivalTime, setEstimatedArrivalTime] = useState(null);

  const movementTimeoutRef = useRef(null);

  useEffect(() => {
    const simulateMovement = () => {
      if (vehicleStatus === "Delivered Successfully") return;

      const nextGate = gates[Math.floor(Math.random() * gates.length)];
      setCurrentGate(nextGate);
      setConfidence(Math.floor(Math.random() * 20) + 70);

      movementTimeoutRef.current = setTimeout(simulateMovement, Math.random() * 5000 + 3000);
    };

    if (vehicleRequested && vehicleStatus !== "Delivered Successfully") {
      simulateMovement();
    }

    return () => clearTimeout(movementTimeoutRef.current);
  }, [vehicleRequested, vehicleStatus]);

  useEffect(() => {
    let interval;
    if(vehicleStatus.startsWith("Waiting at Gate")) {
      const startTime = Date.now();
      setlastUpdate(startTime);

      interval = setInterval(() => {
        const secondsPassed = Math.floor((Date.now() - startTime) / 1000);
        setTimeSinceUpdate(secondsPassed);

        if (secondsPassed >= 60) {
          clearInterval(interval);
          setTimeSinceUpdate(60);
          setVehicleStatus("Delivered Successfully");
        }
      }, 1000);
    } else {
      setlastUpdate(null);
      setTimeSinceUpdate(0);
    }

    return () => clearInterval(interval);
  }, [vehicleStatus]);

  const confirmRequest = () => {
    setVehicleRequested(true);
    setVehicleStatus(`En route to Gate ${currentGate}`);
    setModalVisible(false);

    // New: Simulate user's walking speed and estimated time
    const estimatedTime = Math.floor(Math.random() * 40) + 20; // 20 to 60 seconds
    setEstimatedArrivalTime(estimatedTime);

    setTimeout(() => {
      setVehicleStatus(`Waiting at Gate ${currentGate}`);
    }, 2000);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-blue-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-semibold cursor-pointer">Mall Valet Parking Slot</h1>
          <div className="flex space-x-4">
            <button className="bg-blue-700 ml-2 cursor-pointer hover:border-b-3 duration-200 hover:text-green-100">Home</button>
            <button className="bg-blue-700 ml-2 cursor-pointer hover:border-b-3 duration-300 hover:text-green-100">Services</button>
            <button className="bg-blue-700 ml-2 cursor-pointer hover:border-b-3 duration-300 hover:text-green-100">About</button>
            <button className="bg-blue-700 ml-2 cursor-pointer hover:border-b-3 duration-300 hover:text-green-100">Help</button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <InteractiveMallMap
          gatePositions={gatePositions}
          currentGate={currentGate}
          setCurrentGate={setCurrentGate}
          confidence={confidence}
          vehicleRequested={vehicleRequested}
          setModalVisible={setModalVisible}
          vehicleStatus={vehicleStatus}
          setVehicleStatus={setVehicleStatus}
          setVehicleRequested={setVehicleRequested}
        />

        <div className="space-y-6 mb-10">
          <BookingStatusCard
            confidence={confidence}
            currentGate={currentGate}
            vehicleStatus={vehicleStatus}
            timeSinceUpdate={timeSinceUpdate}
            setTimeSinceUpdate={setTimeSinceUpdate}
            estimatedArrivalTime={estimatedArrivalTime} // New Prop
          />
          <TechStackCard />
        </div>
      </main>

      <BookingConfirmation
        visible={modalVisible}
        currentGate={currentGate}
        onCancel={() => setModalVisible(false)}
        onConfirm={confirmRequest}
      />
    </div>
  );
}
