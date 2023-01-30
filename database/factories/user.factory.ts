import { setSeederFactory } from 'typeorm-extension';
import { UserEntity } from '../../apps/users/src/infrastructure/domain/user.entity';
import { UsersMetadataEntity } from '../../apps/users/src/infrastructure/domain/users-metadata.entity';
import { generateRandomCode } from '../../apps/users/src/application/create-user/create-user.service';

export default setSeederFactory(UserEntity, (faker) => {
  const user = new UserEntity();
  const userMetadata = new UsersMetadataEntity();
  Object.assign(userMetadata, {
    bio: faker.lorem.text(),
    image: faker.image.imageUrl(),
    birthday: faker.date.birthdate(),
  });

  user.name = faker.name.firstName('male');
  user.email = faker.internet.email(user.name);
  user.code = generateRandomCode(6);
  user.userMetadata = userMetadata;

  return user;
});
