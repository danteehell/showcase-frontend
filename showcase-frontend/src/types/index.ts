export type UserRole = 'student' | 'curator' | 'admin';

export interface StudentProfile {
    course: number | null;
    specialty: string | null;
}

export interface CuratorProfile {
    department: string | null;
}

export interface User {
    id: number;
    email: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    role: UserRole;
    student_profile?: StudentProfile;
    curator_profile?: CuratorProfile;
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
    tasks: string[];
    technologies: string[];
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


export interface Partner {
    name: string;
    website: string | null;
}

export interface PartnersResponse {
    data: Partner[];
}

export type ErrorType = 'network' | 'server' | 'client' | 'unknown';

export interface AppError {
    type: ErrorType;
    message: string;
    statusCode?: number;
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

export interface FiltersResponse {
    "Тематика"?: FilterCategory;
    "Специальность"?: FilterCategory;
    "Курс"?: FilterCategory;
    "Корпус"?: FilterCategory;
    "Сложность"?: FilterCategory;
    [key: string]: FilterCategory | undefined; 
}

export interface ProjectFiltersParams {
    search?: string;
    theme?: string;
    specialty?: string;
    course?: string;
}