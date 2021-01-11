import 'reflect-metadata';
import CreateUserService from "@modules/users/services/CreateUserService";
import FakeUserRepository from "@modules/users/repositories/fakes/FakeUserRepository";
import AppError from "@shared/errors/AppError";
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () =>{
    it('should be able to creeate a new user', async () =>{
        const fakeUsersRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider()
        const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

        const user = await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        expect(user).toHaveProperty('id');
    });

    it('should be able to create a new user with duplicated email', async () =>{
        const fakeUsersRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider()
        const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

        const user = await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        expect(createUser.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        })).rejects.toBeInstanceOf(AppError);
    });
});
