import { setSeederFactory } from 'typeorm-extension';
import { UserEntity } from '../../apps/users/src/infrastructure/domain/user.entity';

export default setSeederFactory(UserEntity, (faker) => {
  const user = new UserEntity();
  user.name = faker.name.firstName('male');
  user.email = faker.internet.email(user.name);

  return user;
})
