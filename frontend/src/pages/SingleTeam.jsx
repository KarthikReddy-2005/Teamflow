import React from "react";
import { getTeam } from "../services/teamsService";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { EllipsisVertical, X } from "lucide-react";
import TeamHeader from "../components/TeamHeader";
import SideDrawer from "../components/SideDrawer";
import TeamDetails from "../components/TeamDetails";

const SingleTeam = () => {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activePanel, setActivePanel] = useState(false);
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
  return (
    <div className=" h-screen flex flex-row ">
      <div className="flex flex-col flex-1">
        <div>
          <TeamHeader title={team.name} activatePanel={setActivePanel} />
        </div>

        <div className="flex-1"></div>
      </div>
      <SideDrawer
        title={"Group details"}
        open={activePanel}
        close={setActivePanel}
      >
        <TeamDetails team={team} />
      </SideDrawer>
    </div>
  );
};

export default SingleTeam;
