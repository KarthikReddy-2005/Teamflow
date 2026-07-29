import React from "react";
import { X } from "lucide-react";

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4">
          <X />
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
