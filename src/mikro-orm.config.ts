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
