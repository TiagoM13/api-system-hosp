import { IUser } from "@shared/entities";

export interface IUserRepository {
    findAll(name: string | undefined, skip: number, take: number): Promise<IUser[]>;
    findById(id: number): Promise<IUser | null>;
    findByEmail(email: string): Promise<IUser | null>;
    count(name: string | undefined): Promise<number>;
    create(data: IUser): Promise<IUser>;
    update(id: number, data: IUser): Promise<IUser>;
    changePassword(id: number, data: IUser): Promise<IUser>;
    delete(id: number): Promise<IUser>;
}
