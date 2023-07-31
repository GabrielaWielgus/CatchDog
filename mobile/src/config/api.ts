export const SERVER_BASE = "http://localhost:8080" //"http://192.168.0.84:8080"

export const endpoints = {
    auth: {
        signin: `${SERVER_BASE}/auth/signin`,
        signup: `${SERVER_BASE}/auth/signup`,
        refresh: `${SERVER_BASE}/auth/refresh`
    },
    walk: {
        get: `${SERVER_BASE}/walk`,
        post: `${SERVER_BASE}/walk`,
        delete: `${SERVER_BASE}/walk`
    }
}