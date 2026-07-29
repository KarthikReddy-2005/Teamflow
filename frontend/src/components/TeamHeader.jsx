import { EllipsisVertical } from "lucide-react";

const TeamHeader = ({ title, activatePanel }) => {
  return (
    <div
      onClick={() => activatePanel("groupDetails")}
      className="flex flex-row justify-between items-center p-4 px-12 w-full border-b hover:cursor-pointer"
    >
      <p className="font-bold text-3xl">{title}</p>
      <div onClick={(e) => e.stopPropagation()} className="hover:bg-blue-200">
        <EllipsisVertical size={20} />
      </div>
    </div>
  );
};

export default TeamHeader;
