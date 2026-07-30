import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderContainer from "../components/HeaderContainer";
import SideDrawer from "../components/SideDrawer";
import { useAuth } from "../context/AuthContext";
import ConfirmDialog from "../components/ConfirmDialog";
import { archiveProject, getProject } from "../services/projectsService";
import ProjectDetails from "../components/ProjectDetails";
import EditProjectForm from "../components/EditProjectForm";
import ProjectContent from "../components/ProjectContent";
import { getTeam } from "../services/teamsService";

const SingleProject = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [drawerMode, setDrawerMode] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const proj = await getProject(id);
        if (cancelled) return;
        setProject(proj);

        const team = await getTeam(proj.team);
        if (cancelled) return;
        if (user._id === team.owner) setRole("owner");
        else if (user._id === team.admin) setRole("admin");
        else if (team.members.some((m) => m === user._id)) setRole("member");
        else navigate("/teams");
      } catch (err) {
        if (!cancelled) setProject(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id, user]);

  if (loading) return <p>Loading team...</p>;
  if (!project) return <p>Team not found</p>;

  const headerActions = [
    {
      key: "projectDetails",
      label: "Project details",
    },
    ...(role === "owner" || role === "admin"
      ? [
          {
            key: "editProject",
            label: "Edit project",
          },
        ]
      : []),
    ...(role === "owner"
      ? [
          {
            key: "deleteProject",
            label: "Delete project",
            className: "text-red-600",
          },
        ]
      : []),
    {
      key: "exitProject",
      label: "Exit project",
      className: "text-red-600",
      disabled: true,
    },
  ];

  let drawerContent = null;
  let drawerTitle = null;
  if (drawerMode === "projectDetails") {
    drawerTitle = "Project details";
    drawerContent = (
      <ProjectDetails
        project={project}
        onEdit={() => setDrawerMode("editProject")}
        onDelete={() => setDrawerMode("deleteProject")}
        onExit={() => setDrawerMode("exitProject")}
        role={role}
      />
    );
  } else if (drawerMode === "editProject") {
    drawerTitle = "Edit details";
    drawerContent = (
      <EditProjectForm
        project={project}
        onUpdate={setProject}
        onSuccess={() => setDrawerMode("projectDetails")}
      />
    );
  } else if (drawerMode === "deleteProject") {
    drawerTitle = "Delete Project";
    drawerContent = (
      <ConfirmDialog
        title="Are you sure you want to delete the team?"
        message="This action cannot be undone."
        confirmLabel="Delete"
        loadingLabel="Deleting..."
        onConfirm={async () => {
          await archiveProject(project._id);
          navigate("/teams");
        }}
        onCancel={() => setDrawerMode(null)}
      />
    );
  } else if (drawerMode === "exitProject") {
    drawerTitle = "Exit Project";
    drawerContent = (
      <ConfirmDialog
        title="Are you sure you want to exit the project?"
        message="You will be removed from the project."
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
            title={project.name}
            actions={headerActions}
            activatePanel={setDrawerMode}
            def={"projectDetails"}
          />
        </div>

        <div className="flex-1">
          <ProjectContent />
        </div>
      </div>
      <SideDrawer title={drawerTitle} open={drawerMode} close={setDrawerMode}>
        {drawerContent}
      </SideDrawer>
    </div>
  );
};

export default SingleProject;
