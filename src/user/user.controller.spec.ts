import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
    userController = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('Register user works', async () => {
    const randoEmail = 'rando@gmail.com';
    const randoUsername = 'rando_username';
    const randoPassword = 'rando_password';

    userController.create({
      username: randoUsername,
      email: randoEmail,
      password: randoPassword,
    });

    // expect(user).toEqual({
    //   user: {},
    // });
  });
});
