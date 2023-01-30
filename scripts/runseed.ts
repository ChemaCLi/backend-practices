import { runSeeders } from 'typeorm-extension';
import { dataSource } from './data-source';

(async (): Promise<void> => {
  await dataSource.initialize();

  await runSeeders(dataSource);
})();
