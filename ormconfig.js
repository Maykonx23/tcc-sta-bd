module.exports = {
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: ["dist/modules/**/typeorm/entities/*.js"],
    migrations: ["dist/shared/typeorm/migrations/*.js"],
    ssl: true,
    extra: { ssl: { rejectUnauthorized: false } },
    cli: {
        migrationsDir: "./src/shared/typeorm/migrations",
    },
};
