import 'reflect-metadata';
import FakeUserRepository from "@modules/users/repositories/fakes/FakeUserRepository";
// import AuthenticateUserService from "@modules/users/services/AuthenticateUserService";
// import CreateUserService from "@modules/users/services/CreateUserService";
// import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from "@shared/errors/AppError";

// import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;
let createUser: CreateUserService;

describe('AuthenticateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUserRepository();
        fakeHashProvider = new FakeHashProvider();

        authenticateUser = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );
        createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    });

    it('should not be able to authenticate with a non existing user', async () => {
        await expect(
            authenticateUser.execute({
                email: 'johndoe@example.com',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate with wrong password', async () => {
        await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123123',
        });

        await expect(
            authenticateUser.execute({
                email: 'johndoe@example.com',
                password: 'wrong-password',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    // it('should be able to authenticate', async () => {
    //     const user = await createUser.execute({
    //         name: 'John Doe',
    //         email: 'johndoe@example.com',
    //         password: '123123',
    //     });
    //
    //     const response = await authenticateUser.execute({
    //         email: 'johndoe@example.com',
    //         password: '123123',
    //     });
    //
    //     expect(response).toHaveProperty('token');
    //     expect(response.user).toEqual(user);
    // });
});
