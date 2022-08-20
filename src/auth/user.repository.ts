import { User } from 'src/entities/user.entity';
import { CustomRepository } from 'src/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, status } = createUserDto;
    const user = this.create({ username, password, status });

    await this.save(user);
    return user;
  }
}
