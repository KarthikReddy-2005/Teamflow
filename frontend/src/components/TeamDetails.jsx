import { Edit, Plus, Trash } from "lucide-react";
import React from "react";

const TeamDetails = ({ team }) => {
  return (
    <div className="mt-6 space-y-6">
      <h1 className="text-center font-bold text-3xl">{team.name}</h1>
      <p>{team.description}</p>
      <div className="flex gap-2">
        <button className="flex justify-between gap-3 items-center hover:bg-slate-200 cursor-pointer rounded-3xl p-3 px-7 border">
          <Plus size={20} />
          Add
        </button>
        <button className="flex justify-between gap-3 items-center hover:bg-slate-200 cursor-pointer rounded-3xl p-3 px-7 border">
          <Edit size={20} />
          Edit
        </button>
        <button className="flex justify-between gap-3 items-center hover:bg-slate-200 cursor-pointer rounded-3xl p-3 px-7 border">
          <Trash Edit size={20} />
          Delete
        </button>
      </div>
      <h1 className="border-b">
        <span>{team.members.length}</span>
        {team.members.length > 1 ? " Members" : " Member"}
      </h1>
      <p className="text-red-500">Leave team</p>
    </div>
  );
};

export default TeamDetails;
