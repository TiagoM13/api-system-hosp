export enum UserType {
    ADMIN = "administrador",
    EDIT = "editor",
    CLINICAL = "clínico",
    NO_TYPE = "não definido"
}

export enum Status {
    ACTIVE = "ativo",
    INACTIVE = "inativo"
}

export type IUser = {
    id?: number;
    name: string;
    email: string;
    user_type: string;
    image_url?: string | null;
    status?: string;
    last_access?: Date | null;
    password?: string;
}