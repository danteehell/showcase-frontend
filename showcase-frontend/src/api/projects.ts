import api from './axios';
import { ENDPOINTS } from './endpoints';
import type { ProjectsResponse, Project } from '../types';

export const getProjects = async (params?: Record<string, string>): Promise<ProjectsResponse> => {
    const response = await api.get<ProjectsResponse>(ENDPOINTS.PROJECTS.LIST, { params });
    return response.data;
};

export const getProjectById = async (id: string): Promise<Project> => {
    const response = await api.get<Project>(ENDPOINTS.PROJECTS.DETAILS(id));
    return response.data;
};