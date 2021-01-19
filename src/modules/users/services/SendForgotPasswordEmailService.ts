import {inject, injectable} from "tsyringe";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import AppError from "@shared/errors/AppError";
import IUserTokenRepository from "@modules/users/repositories/IUserTokenRepository";
import path from 'path';

interface Request{
    email:string;
}

@injectable()
class SendForgotPasswordEmailService{

    constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject('UserTokenRepository')
        private userTokenRepository: IUserTokenRepository,
    ) {}

    public async execute({email}: Request): Promise<void>{
        const user = await this.userRepository.findByEmail(email);

        if(!user){
            throw new AppError('User does not exists.');
        }

        const {token} = await this.userTokenRepository.generate(user.id);

        const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');

        await this.mailProvider.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: '[GoBarber] Recuperação de senha',
            templateData:{
                template: forgotPasswordTemplate,
                variables:{
                    name: user.name,
                    link: `http://localhost:3333/reset_password?token=${token}`,
                },
            },
        });

    }
}

export default SendForgotPasswordEmailService;
