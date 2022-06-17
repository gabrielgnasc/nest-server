import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../modules/user/domain/User.entity';
import { UserRepositoryService } from '../../modules/user/repository/user-repository.service';

describe('UserRespository', () => {
  let userRepositoryService: UserRepositoryService;

  const mockedRepository = {
    findOneBy: jest.fn((options) => {
      const user = new User();
      user.id = options.id;
      return Promise.resolve(user);
    }),
    findOne: jest.fn((options) => {
      const user = new User();
      user.id = options?.id;
      user.email = options?.email;
      return Promise.resolve(user);
    }),
    find: jest.fn((id) => Promise.resolve([new User()])),
    create: jest.fn((user) => Promise.resolve(user)),
    merge: jest.fn((user, item) => user),
    save: jest.fn((user) => user),
    softDelete: jest.fn((user) => Promise.resolve()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepositoryService,
        {
          provide: getRepositoryToken(User),
          useValue: mockedRepository,
        },
      ],
    }).compile();

    userRepositoryService = module.get<UserRepositoryService>(UserRepositoryService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(userRepositoryService).toBeDefined();
  });

  describe('Find All', () => {
    it('should repository throw an exception', async () => {
      jest.spyOn(mockedRepository, 'find').mockRejectedValueOnce(new Error());
      expect(userRepositoryService.findAll()).rejects.toThrowError();
    });

    it('should return an User List', async () => {
      jest.spyOn(mockedRepository, 'find').mockResolvedValueOnce([new User(), new User()]);
      const response = await userRepositoryService.findAll();
      expect(mockedRepository.find).toHaveReturned();
      expect(response).toBeInstanceOf(Array);
      expect(response[0]).toBeInstanceOf(User);
      expect(response.length).toBe(2);
    });
  });

  describe('Find', () => {
    it('should repository throw an exception', async () => {
      jest.spyOn(mockedRepository, 'findOneBy').mockRejectedValueOnce(new Error());
      expect(userRepositoryService.find('any_id')).rejects.toThrowError();
    });

    it('should return an User List', async () => {
      const response = await userRepositoryService.find('any_id');
      expect(mockedRepository.findOneBy).toHaveReturned();
      expect(response).toBeInstanceOf(User);
      expect(response.id).toEqual('any_id');
    });
  });

  describe('Create', () => {
    const user = new User();
    it('should repository throw an exception', async () => {
      jest.spyOn(mockedRepository, 'create').mockRejectedValueOnce(new Error());
      expect(userRepositoryService.create(user)).rejects.toThrowError();
    });

    it('should return an User on create', async () => {
      const response = await userRepositoryService.create(user);
      expect(mockedRepository.create).toHaveReturned();
      expect(response).toBeInstanceOf(User);
    });
  });

  describe('Update', () => {
    const user = new User();
    user.id = 'any_id';

    it('should find function throw an exception', async () => {
      jest.spyOn(mockedRepository, 'findOneBy').mockRejectedValueOnce(new Error());
      expect(userRepositoryService.update('any_id', user)).rejects.toThrowError();
    });

    it('should merge function throw an exception', async () => {
      jest.spyOn(mockedRepository, 'merge').mockRejectedValueOnce(new Error());
      expect(userRepositoryService.update('any_id', user)).rejects.toThrowError();
    });

    it('should save function throw an exception', async () => {
      jest.spyOn(mockedRepository, 'save').mockRejectedValueOnce(new Error());
      expect(userRepositoryService.update('any_id', user)).rejects.toThrowError();
    });

    it('should return an User on update', async () => {
      const response = await userRepositoryService.update('any_id', user);
      expect(mockedRepository.save).toHaveReturned();
      expect(response).toBeInstanceOf(User);
      expect(response.id).toEqual('any_id');
    });
  });

  describe('Delete', () => {
    const user = new User();
    it('should repository throw an exception', async () => {
      jest.spyOn(mockedRepository, 'softDelete').mockRejectedValueOnce(new Error());
      expect(userRepositoryService.delete('any_id')).rejects.toThrowError();
    });

    it('should return an User on create', async () => {
      await userRepositoryService.delete('any_id');
      expect(mockedRepository.softDelete).toHaveReturned();
    });
  });

  describe('findBy', () => {
    const user = new User();
    it('should repository throw an exception', async () => {
      jest.spyOn(mockedRepository, 'findOne').mockRejectedValueOnce(new Error());
      expect(userRepositoryService.findBy({ id: 'any_id' })).rejects.toThrowError();
    });

    it('should return an User on create', async () => {
      await userRepositoryService.findBy({ email: 'anyemail@mail.com', id: 'any_id' });
      expect(mockedRepository.findOne).toHaveReturned();
    });
  });
});
