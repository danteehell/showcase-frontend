export const ENDPOINTS = {
    AUTH: {
        LOGIN: '/users/login/',
        ME: '/users/me/',
        LOGOUT: '/users/logout/',
    },
    PROJECTS: {
        LIST: '/showcase/projects/',
        DETAILS: (id: number | string) => `/showcase/projects-manage/${id}/`,
        FILTERS: '/showcase/filters/',
        PARTNERS: '/showcase/partners/',
    },
    TASKS: {
        LIST: '/tasks/',
        TAKE: (id: number) => `/tasks/${id}/take/`,
    }
};