import { inject, injectable } from "inversify";
import TYPES from "../config/types";
import { UserException } from "../exceptions/UserException";
import { RoleManager } from "../role/role.manager";
import { Role, toRole, toRoleDTO } from "../role/role.model";
import { User } from "./user.model";
import { UserRepository } from "./user.repository";
import { LoginDTO, NewUserDTO, UserDatabaseDTO } from "./user.schema";

export interface UserManager {
    newUser(user: NewUserDTO): Promise<User>;
    editUser(user: User): Promise<User>;
    login(loginData: LoginDTO): Promise<User>;
    getUsers(): Promise<User[]>;
    getUser(id: string): Promise<User>;
}

@injectable()
export class UserManagerImpl implements UserManager {

    @inject(TYPES.UserRepository)
    private userRepository: UserRepository;

    @inject(TYPES.RoleManager)
    private roleManager: RoleManager;

    public async newUser(user: NewUserDTO): Promise<User> {
        const createdUser = new User(user.firstName, user.lastName, user.email, "");
        const userAlreadyExists = await this.userRepository.getUserByEmail(createdUser.email);
        if (userAlreadyExists) {
            throw new UserException("User Already Exists with the email: " + user.email);
        }
        createdUser.setPassword(user.password);
        const newUser = await this.userRepository.newUser(this.toUserDto(createdUser)).then((u: UserDatabaseDTO) => {
            return this.toUser(u);
        });
        const defaultRole = await this.roleManager.newRole(new Role("user", newUser.id));
        newUser.roles = [];
        newUser.roles.push(defaultRole);
        return newUser;
    }

    public async editUser(user: User): Promise<User> {
        const userToEdit = await this.userRepository.getUser(user.id);
        userToEdit.email = user.email;
        userToEdit.firstName = user.firstName;
        userToEdit.lastName = user.lastName;
        return await this.userRepository.editUser(userToEdit).then((u: UserDatabaseDTO) => {
            return this.toUser(u);
        });
    }

    public async login(loginData: LoginDTO): Promise<User> {
        return await this.userRepository.getUserByEmail(loginData.email)
            .then((u: UserDatabaseDTO) => this.toUser(u))
            .then((u: User) => {
                if (u.validatePassword(loginData.password)) {
                    return u;
                } else {
                    throw new Error("Password does not match");
                }
            });
    }

    public async getUser(id: string): Promise<User> {
        return await this.userRepository.getUser(id).then((u: UserDatabaseDTO) => {
            return this.toUser(u);
        });
    }

    public async getUsers(): Promise<User[]> {
        return await this.userRepository.getUsers().then((users: UserDatabaseDTO[]) => users.map((u: UserDatabaseDTO) => {
            return this.toUser(u);
        }));
    }

    private toUserDto(user: User): UserDatabaseDTO {
        return {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            roles: user.roles && user.roles.map((r) => toRoleDTO(r)),
            _id: user.id
        };
    }

    private toUser(user: UserDatabaseDTO): User {
        return new User(
            user.firstName,
            user.lastName,
            user.email,
            user.password,
            user.roles && user.roles.map((r) => toRole(r)),
            user._id
        );
    }

}
