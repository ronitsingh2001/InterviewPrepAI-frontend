import { X } from "lucide-react";
import React, { Children } from "react";

function Modal({ children, title, isOpen, onClose, hideHeader }) {
    if(!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center h-full w-full bg-black/40">
      {/* Modal Content */}
      <div
        className={`relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden p-4`}
      >
        {/* Modal Header */}
        {!hideHeader && (
          <div className="flex justify-center items-center p-4 border-b border-gray-200">
            <h3 className="md:text-lg font-medium text-gray-900">{title}</h3>
          </div>
        )}

        <button className="text-gray-400 ms-auto cursor-pointer" type="button" onClick={onClose}><X /></button>
        <div className="flex-1 overflow-y-scroll custom-scrollbar">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
