import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import CreateTeamForm from "../components/CreateTeamForm";
import Card from "../components/Card";
import { useNavigate, useParams } from "react-router-dom";
import CreateProjectForm from "./CreateProjectForm";
import { getProjectsOfTeam } from "../services/projectsService";

const TeamContent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  async function fetchProjects() {
    try {
      setLoading(true);
      const data = await getProjectsOfTeam(id);
      setProjects(data);
    } catch (error) {
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) {
    return <p>Loading teams...</p>;
  }

  const handleProjectClick = (id) => {
    navigate(`/projects/${id}`);
  };

  return (
    <>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <CreateProjectForm
          id={id}
          onSuccess={fetchProjects}
          onClose={() => setIsOpen(false)}
        />
      </Modal>
      <div className="flex flex-row justify-between items-center p-4 w-full ">
        <p className="font-bold ">Projects</p>
        <button
          className="px-3 py-3 rounded-md bg-blue-400 text-white"
          onClick={() => setIsOpen(true)}
        >
          create Project
        </button>
      </div>

      <div className="p-6 flex flex-row flex-wrap gap-3">
        {projects.map((project) => (
          <div
            className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 hover:bg-slate-50 cursor-pointer"
            onClick={() => handleProjectClick(project._id)}
            key={project._id}
          >
            <p>{project.name}</p>
          </div>
        ))}
      </div>
    </>
  );
};
export default TeamContent;
