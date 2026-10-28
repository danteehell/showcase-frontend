export type UserRole = 'student' | 'curator' | 'admin';

export interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    role: UserRole;
}

export interface AuthResponse {
    access_token: string;
    refresh_token: string;
    user: User;
}

export interface ProjectListItem {
    type: string;
    position: number;
    text: string;
}

export interface Project {
    id: number;
    title: string;
    theme: string | null;
    specialties: string[];
    campus: string | null;
    courses: string[];
    day_of_week: string | null;
    difficulty: string | null;
    partner: string | null;
    curator: string | null;
    internship: boolean;
    spots_remaining: number;
    short_description: string;
    long_description: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    list_items: ProjectListItem[];
}

export interface ProjectsResponse {
    data: Project[];
    totalProjects: number;
    availableProjects: number;
    totalPages: number;
    page: number;
}

export interface FilterOption {
    id: number;
    name: string;
}

export interface FilterCategory {
    id: number;
    name: string;
    options: FilterOption[];
}

export type FiltersResponse = Record<string, FilterCategory>;

export interface Partner {
    name: string;
    website: string | null;
}

export interface PartnersResponse {
    data: Partner[];
}