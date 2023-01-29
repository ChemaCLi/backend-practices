import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { UserEntity } from '../../apps/users/src/infrastructure/domain/user.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const userFactory = await factoryManager.get(UserEntity);
    await userFactory.saveMany(10_000);
  }
}
