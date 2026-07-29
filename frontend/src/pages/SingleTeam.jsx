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
  else if (user._id === team.members.some((member) => member)) role = "member";
  else navigate("/teams");

  let drawerContent = null;
  if (drawerMode === "groupDetails") {
    drawerContent = (
      <TeamDetails
        team={team}
        onEdit={() => setDrawerMode("editTeam")}
        role={role}
      />
    );
  } else if (drawerMode === "editTeam") {
    drawerContent = (
      <EditTeamForm
        team={team}
        onUpdate={setTeam}
        onSuccess={() => setDrawerMode("groupDetails")}
      />
    );
  }
  return (
    <div className=" h-screen flex flex-row ">
      <div className="flex flex-col flex-1">
        <div>
          <TeamHeader title={team.name} activatePanel={setDrawerMode} />
        </div>

        <div className="flex-1"></div>
      </div>
      <SideDrawer
        title={"Group details"}
        open={drawerMode}
        close={setDrawerMode}
      >
        {drawerContent}
      </SideDrawer>
    </div>
  );
};

export default SingleTeam;
