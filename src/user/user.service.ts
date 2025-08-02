import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private UserRepo: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.UserRepo.create(createUserDto);
    return await this.UserRepo.save(user); 
  }

  async findByEmail(email: string) {
    return await this.UserRepo.findOne({ where: { email } });
  }

  async findAll() {
    return await this.UserRepo.find();
  }

  async findOne(id: number) {
    return await this.UserRepo.findOne({
      where: { id },
      select: ['id', 'email', 'firstName', 'lastName', 'role', 'createdAt', 'avatarUrl'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.UserRepo.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    // const user = await this.findOne(id);
    // if (!user) return null;
    // await this.UserRepo.delete(id);
    // return user;

    return 'this removes the user with id: ' + id;
  }
}
