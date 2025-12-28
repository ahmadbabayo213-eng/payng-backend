import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { UserRole } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async createUser(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.usersRepo.create({
      email,
      password: hashedPassword,
      role: UserRole.USER,
    });

    return this.usersRepo.save(user);
  }

  async findAll() {
    return this.usersRepo.find();
  }

  async findByEmail(email: string) {
    return this.usersRepo.findOne({ where: { email } });
  }
}
