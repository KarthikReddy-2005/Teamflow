import React from "react";
import { getTeam } from "../services/teamsService";
import { deleteTeam } from "../services/teamsService";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderContainer from "../components/HeaderContainer";
import SideDrawer from "../components/SideDrawer";
import TeamDetails from "../components/TeamDetails";
import EditTeamForm from "../components/EditTeamForm";
import { useAuth } from "../context/AuthContext";
import TeamContent from "../components/TeamContent";
import ConfirmDialog from "../components/ConfirmDialog";

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

  const headerActions = [
    {
      key: "groupDetails",
      label: "Group details",
    },
    ...(role === "owner" || role === "admin"
      ? [
          {
            key: "editTeam",
            label: "Edit team",
          },
        ]
      : []),
    ...(role === "owner"
      ? [
          {
            key: "deleteTeam",
            label: "Delete team",
            className: "text-red-600",
          },
        ]
      : []),
    {
      key: "exitTeam",
      label: "Leave team",
      className: "text-red-600",
      disabled: true,
    },
  ];

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
      <ConfirmDialog
        title="Are you sure you want to delete the team?"
        message="This action cannot be undone."
        confirmLabel="Delete"
        loadingLabel="Deleting..."
        onConfirm={async () => {
          await deleteTeam(team._id);
          navigate("/teams");
        }}
        onCancel={() => setDrawerMode(null)}
      />
    );
  } else if (drawerMode === "exitTeam") {
    drawerTitle = "Exit Team";
    drawerContent = (
      <ConfirmDialog
        title="Are you sure you want to exit the team?"
        message="You will be removed from the team view."
        confirmLabel="Exit"
        loadingLabel="Exiting..."
        confirmClassName="bg-red-600 hover:bg-red-700"
        onConfirm={async () => {
          navigate("/teams");
        }}
        onCancel={() => setDrawerMode(null)}
      />
    );
  }

  return (
    <div className=" h-screen flex flex-row ">
      <div className="flex flex-col flex-1">
        <div>
          <HeaderContainer
            title={team.name}
            actions={headerActions}
            activatePanel={setDrawerMode}
            def={"groupDetails"}
          />
        </div>

        <div className="flex-1">
          <TeamContent />
        </div>
      </div>
      <SideDrawer title={drawerTitle} open={drawerMode} close={setDrawerMode}>
        {drawerContent}
      </SideDrawer>
    </div>
  );
};

export default SingleTeam;
