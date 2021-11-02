export = {
  type: "mongodb",
  // database: "database.sqlite",
  url: 'mongodb+srv://admin:admin@onboarding.cfni0.mongodb.net/unittest?retryWrites=true&w=majority',
  useNewUrlParser: true,
  useUnifiedTopology: true,
  synchronize: true,
  logging: false,
  // test: true,
  seeds: ['src/app/database/seeds/**/*.seed.ts'],
  entities: ["src/app/entity/**/*.ts"],
  migrations: ["src/app/migration/**/*.ts"],
  subscribers: ["src/app/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/app/entity",
    migrationsDir: "src/app/migration",
    subscribersDir: "src/app/subscriber",
  },
};