import fs from "fs";
import path from "path";
import db from "../src/db";

async function run() {
  const sql = fs.readFileSync(path.join(__dirname, "../migrations/001_init.sql"), "utf-8");
  try {
    await db.raw(sql);
    console.log("Migrations applied");
    process.exit(0);
  } catch (err) {
    console.error("Migration error", err);
    process.exit(1);
  }
}

run();
