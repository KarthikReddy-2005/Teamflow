import React, { useState } from "react";
import { deleteTeam } from "../services/teamsService";
import Button from "./Button";

const DeleteTeamConfirm = ({ id, onDelete, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleClick = async (e) => {
    try {
      setError("");
      setLoading(true);
      await deleteTeam(id);
      onDelete();
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <p>Loading team...</p>;
  return (
    <div className="flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
        <h1>Are you sure you want to delete the team?</h1>
        <button
          onClick={() => onCancel()}
          className="w-full py-2 my-5 rounded-lg text-white transition bg-blue-600 hover:bg-blue-700"
          disabled={loading}
        >
          Cancel
        </button>

        <button
          onClick={handleClick}
          className={`w-full py-2 my-2 rounded-lg text-white transition
    ${
      loading ? "bg-red-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
    }`}
        >
          {loading ? "Deleting..." : "Delete"}
        </button>

        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default DeleteTeamConfirm;
