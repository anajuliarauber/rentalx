import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "ignite",
  password: "ignite",
  database: "rentalx",
  migrations: ["./src/database/migrations/*.ts"],
});
