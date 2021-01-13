import FakeUserRepository from "@modules/users/repositories/fakes/FakeUserRepository";
import SendForgotPasswordEmailService from "@modules/users/services/SendForgotPasswordEmailService";
import FakeMailProvider from "@shared/container/providers/MailProvider/fakes/FakeMailProvider";
import AppError from "@shared/errors/AppError";
import FakeUserTokenRepository from "@modules/users/repositories/fakes/FakeUserTokenRepository";

let fakeUserRepository: FakeUserRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokenRepository: FakeUserTokenRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () =>{
    beforeEach(() =>{
        fakeUserRepository = new FakeUserRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeUserTokenRepository = new FakeUserTokenRepository();

        sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeUserRepository,
            fakeMailProvider,
            fakeUserTokenRepository,
        )
    });

    it('should be able recover the password using the users email', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        await fakeUserRepository.create({
           name: 'John Doe',
           email: '',
           password: '1234',
        });

        await sendForgotPasswordEmail.execute({
            email: 'jonhdoe@example.com',
        });

        expect(sendMail).toHaveBeenCalled();
    });

    it('should not be able recover a non-existing user password ', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        await expect(sendForgotPasswordEmail.execute({
            email: 'jonhdoe@example.com',
        })).rejects.toBeInstanceOf(AppError);
    })

    it('shoud generate a forgot password token', async () =>{

        const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');


    });
})
