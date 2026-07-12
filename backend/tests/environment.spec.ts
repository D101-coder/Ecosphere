import { expect } from "chai";
import request from "supertest";
import app from "../src/app";
import db from "../src/db";

let token: string;

describe("Environment endpoints", () => {
  before(async () => {
    // create or fetch admin user and login to get token
    await db("users").insert({
      full_name: "Env Admin",
      employee_id: "ENVADMIN",
      email: "env.admin@example.com",
      password_hash: "$2b$12$invalidhashforlocaltest", // not used if already exists
      role: "admin"
    }).catch(()=>{});
    const r = await request(app).post("/api/auth/login").send({ email: "env.admin@example.com", password: "StrongPass1!" }).catch(()=>({status:401}));
    if (r.status === 200) token = r.body.access;
  });

  it("should list goals", async () => {
    const res = await request(app).get("/api/environment/goals").set("Authorization", `Bearer ${token}`);
    expect(res.status).to.equal(200);
  });
});
