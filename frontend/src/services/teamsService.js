import api from "../api/apiClient";

export const createTeam = async (teamData) => {
  const { data } = await api.post("/api/teams/", teamData);
  return data.data;
};

export const getAllTeams = async () => {
  const { data } = await api.get("/api/teams/");
  return data.data;
};

export const getTeam = async (id) => {
  const { data } = await api.get(`/api/teams/${id}`);
  return data.data;
};

export const updateTeam = async (id, teamData) => {
  const { data } = await api.patch(`/api/teams/${id}`, teamData);
  return data.data;
};

export const deleteTeam = async (id) => {
  const { data } = await api.delete(`/api/teams/${id}`);
  return data.data;
};