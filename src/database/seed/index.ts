import { seed, reset } from "drizzle-seed";
import { db } from "../connection";
import { users } from "../schemas/user";

async function exec() {
  console.log("Seeding database...");
  try {
    await seed(db, {
      users,
    });
    console.log("Database seeded!");
    process.exit(1);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

exec();
