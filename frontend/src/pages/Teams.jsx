import { useEffect, useState } from "react";
import { getAllteams } from "../services/teamsService";
import Modal from "../components/Modal";
import CreateTeamForm from "../components/CreateTeamForm";
import Card from "../components/Card";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  async function fetchTeams() {
    try {
      setLoading(true);
      const data = await getAllteams();
      console.log(data);
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
  return (
    <>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <CreateTeamForm
          onSuccess={fetchTeams}
          onClose={() => setIsOpen(false)}
        />
      </Modal>
      <button
        className="px-3 py-3 rounded-md bg-blue-500 text-white"
        onClick={() => setIsOpen(true)}
      >
        create Team
      </button>
      <p>{`${teams.length > 0 ? teams.length : "No teams yet"}`}</p>
      {teams.map((team) => (
        <Card key={team._id}>
          <p>{team.name}</p>
        </Card>
      ))}
    </>
  );
};

export default Teams;
