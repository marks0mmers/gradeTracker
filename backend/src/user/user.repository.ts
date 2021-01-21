import { injectable } from "inversify";
import { userDatabase, UserDatabaseDTO } from "./user.schema";

export interface UserRepository {
    newUser(user: UserDatabaseDTO): Promise<UserDatabaseDTO>;
    editUser(user: UserDatabaseDTO): Promise<UserDatabaseDTO>;
    getUser(id: string): Promise<UserDatabaseDTO>;
    getUserByEmail(email: string): Promise<UserDatabaseDTO>;
    getUsers(): Promise<UserDatabaseDTO[]>;
}

@injectable()
export class UserRepositoryImpl implements UserRepository {

    public async newUser(user: UserDatabaseDTO): Promise<UserDatabaseDTO> {
        return await userDatabase.create(user);
    }

    public async editUser(user: UserDatabaseDTO): Promise<UserDatabaseDTO> {
        const userDb = await userDatabase.findById(user._id).populate("roles").exec();
        userDb.firstName = user.firstName;
        userDb.lastName = user.lastName;
        userDb.email = user.email;
        userDb.password = user.password;
        return userDb.save();
    }

    public async getUser(id: string): Promise<UserDatabaseDTO> {
        return await userDatabase.findById(id).populate("roles").exec();
    }

    public async getUserByEmail(email: string): Promise<UserDatabaseDTO> {
        return await userDatabase.findOne({email})
            .populate("roles")
            .exec();
    }

    public async getUsers(): Promise<UserDatabaseDTO[]> {
        return await userDatabase.find().populate("roles").exec();
    }

}
