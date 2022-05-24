/* Setup prema namjeni */
const config = {
  dbName: 'CNR',
  type: 'postgresql',
  host: 'localhost',
  port: 5432,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PW,
  entities: ['./dist/entities'],
  entitiesTs: ['./src/entities'],
  debug: true,
};
export default config;
