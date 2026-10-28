import api from './axios';
import { ENDPOINTS } from './endpoints';
import type { ProjectsResponse, Project } from '../types/index';

export const getProjects = async (): Promise<ProjectsResponse> => {
    const response = await api.get<ProjectsResponse>(ENDPOINTS.PROJECTS.LIST);
    return response.data;
};

export const getProjectById = async (id: string): Promise<Project> => {
    const response = await api.get<Project>(ENDPOINTS.PROJECTS.DETAILS(id));
    return response.data;
};