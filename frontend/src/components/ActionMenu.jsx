const ActionMenu = ({ actions = [], onAction, onClose }) => {
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute right-0 top-full mt-2 z-50 w-56 bg-white border rounded-xl shadow-lg py-2">
        {actions.map((action) => (
          <button
            key={action.key}
            type="button"
            onClick={() => !action.disabled && onAction(action.key)}
            disabled={action.disabled}
            className={`w-full text-left px-4 py-2 hover:bg-slate-100 ${
              action.className ?? ""
            }`}
          >
            {action.label}
          </button>
        ))}
      </div>
    </>
  );
};

export default ActionMenu;
