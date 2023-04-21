export interface NewUser {
    firstName ?: string,
    lastName ?: string,
    email ?: string,
    dob ?: string,
    gender ?: string,
    password ?: string,
}

export interface AuthenticateUser {
    email ?: string,
    password ?: string,
}