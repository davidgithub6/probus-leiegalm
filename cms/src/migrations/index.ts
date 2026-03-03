import * as migration_20260303_202709 from './20260303_202709';

export const migrations = [
  {
    up: migration_20260303_202709.up,
    down: migration_20260303_202709.down,
    name: '20260303_202709'
  },
];
