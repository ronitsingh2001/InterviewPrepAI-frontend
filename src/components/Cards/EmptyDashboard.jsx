import React from "react";
import { Lightbulb, PlusCircle } from "lucide-react";

function EmptyDashboard({ onAdd }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6 bg-white rounded-xl border border-dashed border-gray-300 shadow-sm">
      <div className="bg-orange-100 p-4 rounded-full mb-4">
        <Lightbulb size={36} className="text-orange-500" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Ready to start your interview prep journey?
      </h2>
      <p className="text-gray-600 max-w-md mb-6">
        You're just one step away from personalized technical interview questions powered by AI.
        Click the button below to begin by creating your first learning path.
      </p>
      <button
        onClick={onAdd}
        className="cursor-pointer inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full font-medium hover:bg-orange-600 transition"
      >
        <PlusCircle size={18} />
        Add New
      </button>
    </div>
  );
}

export default EmptyDashboard;
