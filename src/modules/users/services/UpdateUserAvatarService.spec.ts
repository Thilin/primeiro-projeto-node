import FakeUserRepository from "@modules/users/repositories/fakes/FakeUserRepository";
import FakeStorageProvider from "@shared/container/providers/StorageProvider/fakes/FakeStorageProvider";
import UpdateUserAvatarService from "@modules/users/services/UpdateUserAvatarService";
import AppError from "@shared/errors/AppError";

let fakeUsersRepository: FakeUserRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar',  () => {

    beforeEach(() =>{
        fakeUsersRepository = new FakeUserRepository();
        fakeStorageProvider = new FakeStorageProvider();
        updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);
    })
    it('should be able to update avatar', async () => {

        const user = await fakeUsersRepository.create({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '123456'
        });

         await updateUserAvatar.execute({
            user_id: user.id,
             avatarFileName: 'avatar.jpg'
         });

         expect(user.avatar).toBe('avatar.jpg');
    });

    it('should not be able to update avatar from a non existing user', async () => {
        await expect(updateUserAvatar.execute({
            user_id: 'non-existing-user',
            avatarFileName: 'avatar.jpg'
        })).rejects.toBeInstanceOf(AppError);
    });

    it('shoulddelete old avatar when updating a new one', async () => {
        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        const updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

        const user = await fakeUsersRepository.create({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '123456'
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar.jpg'
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar2.jpg'
        });

        expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
        expect(user.avatar).toBe('avatar2.jpg');
    });
});
