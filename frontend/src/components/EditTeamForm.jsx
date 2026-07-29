import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { updateTeam } from "../services/teamsService";

const EditTeamForm = ({ team, onUpdate, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: team.name || "",
    description: team.description || "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      const data = await updateTeam(team._id, formData);
      onUpdate(data);
      onSuccess();
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <Input
        id="name"
        label="Team name"
        inputType="text"
        placeholder="Enter team name"
        value={formData.name}
        onChange={handleChange}
      />
      <div className="flex flex-col gap-2">
        <label htmlFor="description">Team description</label>
        <textarea
          id="description"
          autoComplete="description"
          value={formData.description}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-200"
          placeholder="Enter team description"
        />
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <Button text={loading ? "Updating..." : "Update"} disabled={loading} />
    </form>
  );
};

export default EditTeamForm;
