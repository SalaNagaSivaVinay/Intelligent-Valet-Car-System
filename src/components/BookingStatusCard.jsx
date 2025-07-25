import { Car, Clock, Info, MapPin, ShieldCheck } from "lucide-react";

export default function StatusCard({ confidence, currentGate, vehicleStatus, timeSinceUpdate }) {
  // Convert seconds to human-readable format
  function formatDuration(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins === 0) return `${secs}s`;
    return `${mins}m${secs > 0 ? `${secs}s` : ''}`;
  }

  const getConfidenceText = () => {
    if (confidence > 80) return `High confidence you're near Gate ${currentGate}`;
    if (confidence > 60) return `Moderate confidence you're near Gate ${currentGate}`;
    return `Low confidence - please stay near your exit`;
  };

  const barColor =
    confidence > 80 ? "bg-green-600" : confidence > 60 ? "bg-yellow-500" : "bg-red-500";

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
      <div className="flex items-center gap-3 p-4 bg-blue-100 border-b border-blue-300">
        <ShieldCheck className="text-blue-700" />
        <h2 className="text-xl font-semibold text-blue-900">System Status</h2>
      </div>

      <div className="p-5 space-y-5 text-gray-800">
        <div className="flex items-center gap-2">
          <Car className="text-gray-600" size={18} />
          <div>
            <p className="text-sm text-gray-500">Vehicle Status</p>
            <p className={`font-semibold ${vehicleStatus === "Delivered Successfully" ? 'text-green-600' : 'text-yellow-600'}`}>
              {vehicleStatus}
            </p>
          </div>
        </div>

        {vehicleStatus.startsWith("Waiting at Gate") && (
          <div className="flex items-center gap-2">
            <Clock className="text-gray-600" size={18} />
            <div>
              <p className="text-sm text-gray-500">Elapsed Time Since Request</p>
              <p className="font-semibold text-red-500">{formatDuration(timeSinceUpdate)}</p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Clock className="text-gray-600" size={18} />
          <div>
            <p className="text-sm text-gray-500">Expected Delivery Time</p>
            <p className="font-semibold">2-5 minutes after request</p>
          </div>
        </div>

        <div className="flex items-start gap-2 bg-blue-50 p-3 rounded-lg text-sm text-blue-800">
          <Info className="mt-0.5" size={18} />
          <p>
            Our intelligent system is actively tracking your movement to deliver your vehicle to the closest gate.
            Please remain near your selected exit gate.
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
            <MapPin size={14} className="text-gray-600" /> Location Confidence
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-300 ${barColor}`}
              style={{ width: `${confidence}%` }}
            ></div>
          </div>
          <p className="text-xs mt-1 text-gray-600">{getConfidenceText()}</p>
        </div>
      </div>
    </div>
  );
}
