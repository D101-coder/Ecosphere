import { expect } from "chai";
import request from "supertest";
import app from "../src/app"; // adjust export to return express app in app.ts for tests
import db from "../src/db";

describe("Auth endpoints", () => {
  before(async () => {
    // ensure test DB clean or use a test database
    await db("users").where({ email: "test.user@example.com" }).del();
  });

  it("should signup a new user", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      full_name: "Test User",
      employee_id: "TST001",
      email: "test.user@example.com",
      password: "StrongPass1!",
      department_id: 1
    });
    expect(res.status).to.be.oneOf([201, 409]);
  });

  it("should login with correct credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test.user@example.com",
      password: "StrongPass1!"
    });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("access");
  });
});
