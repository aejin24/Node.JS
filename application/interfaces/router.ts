export interface UserModel {
    email: string,
    password: string
}

export interface CreateDeleteRequest {
    email: string
}

export interface UpdateRequest {
    new: string
}