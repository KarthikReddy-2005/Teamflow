import { useEffect, useState } from "react";
import { getAllteams } from "../services/teamsService";
import Modal from "../components/Modal";
import CreateTeamForm from "../components/CreateTeamForm";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

const Teams = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  async function fetchTeams() {
    try {
      setLoading(true);
      const data = await getAllteams();
      setTeams(data);
    } catch (error) {
      setTeams([]);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchTeams();
  }, []);

  if (loading) {
    return <p>Loading teams...</p>;
  }

  const handleTeamClick = (id) => {
    navigate(`/teams/${id}`);
  };

  return (
    <>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <CreateTeamForm
          onSuccess={fetchTeams}
          onClose={() => setIsOpen(false)}
        />
      </Modal>
      <div className="flex flex-row justify-between items-center p-4 w-full border-b">
        <p className="font-bold text-3xl">Teams</p>
        <button
          className="px-3 py-3 rounded-md bg-blue-500 text-white"
          onClick={() => setIsOpen(true)}
        >
          create Team
        </button>
      </div>

      <div className="p-6 flex flex-row flex-wrap gap-3">
        {teams.map((team) => (
          <div
            className="w-full max-w-md bg-white shadow-lg rounded-xl p-8"
            onClick={() => handleTeamClick(team._id)}
            key={team._id}
          >
            <p>{team.name}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Teams;
