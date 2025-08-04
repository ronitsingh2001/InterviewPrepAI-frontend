export const BASE_URL = import.meta.env.VITE_BASE_URL

export const API_PATHS = {
    AUTH: {
        REGISTER: '/api/auth/register',
        LOGIN: '/api/auth/login',
        PROFILE: '/api/auth/profile',
    },
    IMAGE: {
        UPLOAD_IMG: '/api/auth/upload-image'
    },
    AI: {
        GENERATE_QUESTIONS: '/api/ai/generate-questions',
        GENERATE_EXPLAINATION: '/api/ai/generate-explanation',
    },
    SESSION: {
        CREATE: '/api/session/create',
        GET_ALL: '/api/session/my-sessions',
        GET_ONE: (ID) => `/api/session/${ID}`,
        DELETE: (ID) => `/api/session/${ID}`,
    },
    QUESTIONS: {
        ADD_TO_SESSIONS: '/api/question/add',
        PIN: (ID) => `/api/question/${ID}/pin`,
        UPDATE_NOTE: (ID) => `/api/question/${ID}/note`,
    }
}