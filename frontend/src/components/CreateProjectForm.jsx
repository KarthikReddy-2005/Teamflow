import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { createProject } from "../services/projectsService";

const CreateProjectForm = ({ id, onSuccess, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "planning",
    priority: "normal",
    startDate: "",
    dueDate: "",
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
      await createProject(id, formData);
      await onSuccess();
      onClose();
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        id="name"
        label="Team name"
        inputType="text"
        placeholder="Enter team name"
        value={formData.name}
        onChange={handleChange}
      />
      <div className="flex flex-col gap-2">
        <label htmlFor="description">Project description</label>
        <textarea
          id="description"
          autoComplete="description"
          value={formData.description}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-200"
          placeholder="Enter team description"
        />
        <label htmlFor="status">Status</label>
        <select id="status" value={formData.status} onChange={handleChange}>
          <option value="planning">Planning</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <label htmlFor="priority">Priority</label>

        <select id="priority" value={formData.priority} onChange={handleChange}>
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>
        <label htmlFor="startDate">Start Date</label>

        <input
          id="startDate"
          type="date"
          value={formData.startDate}
          onChange={handleChange}
        />
        <label htmlFor="dueDate">Due Date</label>

        <input
          id="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleChange}
        />
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}
      <Button text={loading ? "Creating..." : "Create"} disabled={loading} />
    </form>
  );
};

export default CreateProjectForm;
