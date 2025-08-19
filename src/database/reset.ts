import { reset } from "drizzle-seed";
import { db } from "./connection";
import { schemas } from "./schemas";

async function exec() {
  console.log("Reseting database...");
  try {
    const schemaObjects = Object.values(schemas);
    for (const schema of schemaObjects) {
      await reset(db, {
        schema,
      });
    }
    console.log("Database reset!");
    process.exit(1);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

exec();
