import { Administrator } from './entities/Administrator';
import { Fotografija } from './entities/Fotografija';
import { Glas } from './entities/Glas';
import { Gost } from './entities/Gost';
import { Grad } from './entities/Grad';
import { Korisnik } from './entities/Korisnik';
import { Objekt } from './entities/Objekt';
import { Ugostitelj } from './entities/Ugostitelj';

const config = {
  dbName: 'CNR',
  type: 'postgresql',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'bazepodataka',
  entities: ['./dist/entities'],
  entitiesTs: ['./src/entities'],
};
export default config;
