import React from "react";
import { getTeam } from "../services/teamsService";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const SingleTeam = () => {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

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
  return <div>{team?.name}</div>;
};

export default SingleTeam;
