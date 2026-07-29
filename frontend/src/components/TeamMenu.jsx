const TeamMenu = ({ role, onAction, onClose }) => {
  const canEdit = role === "owner" || role === "admin";
  const canDelete = role === "owner";

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute right-8 top-16 z-50 w-56 bg-white border rounded-xl shadow-lg py-2">
        <button
          onClick={() => onAction("groupDetails")}
          className="w-full text-left px-4 py-2 hover:bg-slate-100"
        >
          Group details
        </button>
        {canEdit && (
          <button
            onClick={() => onAction("editTeam")}
            className="w-full text-left px-4 py-2 hover:bg-slate-100"
          >
            Edit team
          </button>
        )}
        {canDelete && (
          <button
            onClick={() => onAction("deleteTeam")}
            className="w-full text-left px-4 py-2 hover:bg-slate-100 text-red-600"
          >
            Delete team
          </button>
        )}
        <button
          onClick={() => onAction("leaveTeam")}
          className="w-full text-left px-4 py-2 hover:bg-slate-100 text-red-600"
        >
          Leave team
        </button>
      </div>
    </>
  );
};

export default TeamMenu;
