import React, { useState } from "react";

const ConfirmDialog = ({
  title,
  message,
  confirmLabel,
  loadingLabel,
  confirmClassName = "bg-red-600 hover:bg-red-700",
  onConfirm,
  onCancel,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConfirm = async () => {
    try {
      setError("");
      setLoading(true);
      await onConfirm();
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
        <h1>{title}</h1>
        {message && <p className="mt-2 text-slate-600">{message}</p>}

        <button
          onClick={onCancel}
          className="w-full py-2 my-5 rounded-lg text-white transition bg-blue-600 hover:bg-blue-700"
          disabled={loading}
        >
          Cancel
        </button>

        <button
          onClick={handleConfirm}
          className={`w-full py-2 my-2 rounded-lg text-white transition ${
            loading ? "bg-red-400 cursor-not-allowed" : confirmClassName
          }`}
          disabled={loading}
        >
          {loading ? loadingLabel : confirmLabel}
        </button>

        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default ConfirmDialog;
