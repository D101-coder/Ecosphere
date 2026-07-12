import db from "../src/db";

async function seed() {
  try {
    await db("departments").insert([
      { name: "Human Resources", code: "HR", head: "Priya Shah", employee_count: 12 },
      { name: "IT", code: "IT", head: "Ravi Patel", employee_count: 25 },
      { name: "Finance", code: "FIN", head: "Anil Mehta", employee_count: 8 },
      { name: "Operations", code: "OPS", head: "Meera Joshi", employee_count: 40 },
      { name: "Management", code: "MGMT", head: "CEO Office", employee_count: 6 },
      { name: "Marketing", code: "MKT", head: "Sonal Desai", employee_count: 10 }
    ]);
    await db("rewards").insert([
      { name: "Eco Mug", description: "Reusable mug", points_required: 100, stock: 20 },
      { name: "Extra Day Off", description: "Half day off", points_required: 500, stock: 5 }
    ]);
    console.log("Seed complete");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
