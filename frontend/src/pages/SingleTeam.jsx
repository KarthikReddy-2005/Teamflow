import React from "react";
import { getTeam } from "../services/teamsService";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EllipsisVertical, X } from "lucide-react";
import TeamHeader from "../components/TeamHeader";
import SideDrawer from "../components/SideDrawer";
import TeamDetails from "../components/TeamDetails";
import EditTeamForm from "../components/EditTeamForm";
import { useAuth } from "../context/AuthContext";
import DeleteTeamConfirm from "../components/DeleteTeamConfirm";
import ExitTeamConfirm from "../components/ExitTeamConfirm";

const SingleTeam = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [drawerMode, setDrawerMode] = useState(null);
  async function fetchTeam() {
    try {
      setLoading(true);
      const data = await getTeam(id);
      setTeam(data);
    } catch (error) {
      setTeam();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) fetchTeam();
  }, [id]);

  if (loading) return <p>Loading team...</p>;
  if (!team) return <p>Team not found</p>;

  let role = null;
  if (user._id === team.owner) role = "owner";
  else if (user._id === team.admin) role = "admin";
  else if (team.members.some((member) => member === user._id)) role = "member";
  else navigate("/teams");

  let drawerContent = null;
  let drawerTitle = null;
  if (drawerMode === "groupDetails") {
    drawerTitle = "Group details";
    drawerContent = (
      <TeamDetails
        team={team}
        onEdit={() => setDrawerMode("editTeam")}
        onDelete={() => setDrawerMode("deleteTeam")}
        onExit={() => setDrawerMode("exitTeam")}
        role={role}
      />
    );
  } else if (drawerMode === "editTeam") {
    drawerTitle = "Edit details";
    drawerContent = (
      <EditTeamForm
        team={team}
        onUpdate={setTeam}
        onSuccess={() => setDrawerMode("groupDetails")}
      />
    );
  } else if (drawerMode === "deleteTeam") {
    drawerTitle = "Delete Team";
    drawerContent = (
      <DeleteTeamConfirm
        id={team._id}
        onDelete={() => navigate("/teams")}
        onCancel={() => setDrawerMode(null)}
      />
    );
  } else if (drawerMode === "exitTeam") {
    drawerTitle = "Exit Team";
    drawerContent = (
      <ExitTeamConfirm
        team={team._id}
        onExit={() => navigate("/teams")}
        onCancel={() => setDrawerMode(null)}
      />
    );
  }

  return (
    <div className=" h-screen flex flex-row ">
      <div className="flex flex-col flex-1">
        <div>
          <TeamHeader
            title={team.name}
            role={role}
            activatePanel={setDrawerMode}
          />
        </div>

        <div className="flex-1"></div>
      </div>
      <SideDrawer title={drawerTitle} open={drawerMode} close={setDrawerMode}>
        {drawerContent}
      </SideDrawer>
    </div>
  );
};

export default SingleTeam;
