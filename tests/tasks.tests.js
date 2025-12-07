const request = require("supertest");
const app = require("../server");

describe("POST /tasks", () => {

  test("should create a task successfully", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({
        title: "Test Task",
        description: "Unit test description",
        status: "pending",
        dueDate: "2025-01-01T10:00"
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.task).toHaveProperty("id");
  });

  test("should fail when required fields are missing", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({
        description: "Missing title",
        status: "pending",
        dueDate: "2025-01-01T10:00"
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test("should fail if dueDate is missing", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({
        title: "No due date",
        status: "pending"
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

});