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
    },
    chat: {
        get: `${SERVER_BASE}/chat/`,
        post: `${SERVER_BASE}/chat`,
        users: {
            get: `${SERVER_BASE}/chat/users`
        }
    },
    message: {
        get: `${SERVER_BASE}/chat/message`,
        post: `${SERVER_BASE}/chat/message`
    },
    user: {
        password: {
            patch: `${SERVER_BASE}/user/password`
        },
        data: {
            patch: `${SERVER_BASE}/user/data`
        }
    },
    dog: {
        get: `${SERVER_BASE}/dog`,
        post: `${SERVER_BASE}/dog`,
        delete: `${SERVER_BASE}/dog`,
        treatment: {
            post: `${SERVER_BASE}/dog/treatment`,
            delete: `${SERVER_BASE}/dog/treatment`
        }
    },
    treatment: {
        get: `${SERVER_BASE}/treatment`
    }
}