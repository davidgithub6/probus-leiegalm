import * as migration_20260303_202709 from './20260303_202709';
import * as migration_20260304_000000 from './20260304_000000';
import * as migration_20260304_100000 from './20260304_100000';
import * as migration_20260304_110000 from './20260304_110000';
import * as migration_20260304_120000 from './20260304_120000';

export const migrations = [
  {
    up: migration_20260303_202709.up,
    down: migration_20260303_202709.down,
    name: '20260303_202709'
  },
  {
    up: migration_20260304_000000.up,
    down: migration_20260304_000000.down,
    name: '20260304_000000'
  },
  {
    up: migration_20260304_100000.up,
    down: migration_20260304_100000.down,
    name: '20260304_100000'
  },
  {
    up: migration_20260304_110000.up,
    down: migration_20260304_110000.down,
    name: '20260304_110000'
  },
  {
    up: migration_20260304_120000.up,
    down: migration_20260304_120000.down,
    name: '20260304_120000'
  },
];
