import User from "../infra/typeorm/entities/User";
import {hash} from "bcryptjs";
import AppError from "@shared/errors/AppError";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import {inject, injectable} from "tsyringe";

interface Request{
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService{
    constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository) {
    }
    public async execute({name, email, password}: Request): Promise<User>{
        const checkUserExists = await this.userRepository.findByEmail(email);

        if(checkUserExists){
            throw new AppError('Email alddress already used.', 400);
        }

        const hashedPassword = await hash(password, 8);

        const user = await this.userRepository.create({
            name, email, password: hashedPassword
        });

        return user;
    }
}

export default CreateUserService;