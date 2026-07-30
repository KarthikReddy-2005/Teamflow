import api from "../api/apiClient";

export const createProject = async (id, projectData) => {
  const { data } = await api.post(`/api/teams/${id}/projects`, projectData);
  return data.data;
};

export const getProjectsOfTeam = async (id) => {
  const { data } = await api.get(`/api/teams/${id}/projects`);
  return data.data;
};

export const getProjects = async () => {
  const { data } = await api.get("/api/projects/");
  return data.data;
};

export const getProject = async (id) => {
  const { data } = await api.get(`/api/projects/${id}`);
  return data.data;
};

export const updateProject = async (id, projectData) => {
  const { data } = await api.patch(`/api/projects/${id}`, projectData);
  return data.data;
};

export const archiveProject = async (id) => {
  const { data } = await api.patch(`/api/projects/${id}/archive`);
  return data.data;
};