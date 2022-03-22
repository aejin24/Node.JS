export interface UserModel {
    email: string,
    password: string
}

export interface CreateDeleteRequest {
    email: string
}

export interface UpdateRequest {
    oldEmail: string
    newEmail: string
}