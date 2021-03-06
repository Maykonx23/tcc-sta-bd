module.exports = {
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: ["dist/modules/**/typeorm/entities/*.js"],
    migrations: ["dist/shared/typeorm/migrations/*.js"],
    extra: { ssl: true },
    cli: {
        migrationsDir: "./src/shared/typeorm/migrations",
    },
};
