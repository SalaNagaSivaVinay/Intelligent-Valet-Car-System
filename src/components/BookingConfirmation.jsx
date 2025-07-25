// export default function BookingConfirmation({ visible, currentGate, onCancel, onConfirm }) {
//   // If modal is not visible, return null
//   if (!visible) return null;

//   return (
//     // Fullscreen modal for confirmation
//     <div className="fixed inset-0 bg-black/70  flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
//         <h3 className="text-xl font-bold mb-4">Vehicle Request Confirmation</h3>
//         <p className="mb-4">
//           Your vehicle will be delivered to <span className="font-semibold">Gate {currentGate}</span>{" "}
//           in approximately <span className="font-semibold">3 minutes</span>.
//         </p>
//         {/* Action btns -  Cancel and Confirm */}
//         <div className="flex justify-end space-x-3 mt-4">
//           <button
//             onClick={onCancel}
//             className="px-4 py-2 border border-gray-300 rounded-lg cursor-pointer"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700"
//           >
//             Confirm
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }




import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useState } from "react";

export default function BookingConfirmation({ visible, currentGate, onCancel, onConfirm }) {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl"
      >
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="text-green-600" size={28} />
          <h3 className="text-2xl font-bold text-gray-800">Request Confirmation</h3>
        </div>

        <p className="mb-4 text-gray-700">
          Your vehicle will arrive at <span className="font-semibold text-blue-600">Gate {currentGate}</span>{" "}
          in approximately <span className="font-semibold text-blue-600">3 minutes</span>.
        </p>

        <label className="inline-flex items-center space-x-2 mb-4 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={dontShowAgain}
            onChange={() => setDontShowAgain(!dontShowAgain)}
            className="accent-blue-600"
          />
          <span>Don't show this again</span>
        </label>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              // You can store "dontShowAgain" value in localStorage if needed
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </div>
  );
}
