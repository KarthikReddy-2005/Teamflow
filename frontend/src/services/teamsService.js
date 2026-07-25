import api from "../api/apiClient";

export const createTeam = async (teamData) => {
  const { data } = await api.post("/api/teams/", teamData);
  return data.data;
};

export const getAllteams = async () => {
  const { data } = await api.get("/api/teams/");
  return data.data;
};
