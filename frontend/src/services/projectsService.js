import api from "../api/apiClient";

export const createProject = async (id, projectData) => {
  const { data } = await api.post(`/api/teams/${id}/projects`, projectData);
  return data.data;
};

export const getProjectsOfTeam = async (id) => {
  const { data } = await api.get(`/api/teams/${id}/projects`);
  return data.data;
};
