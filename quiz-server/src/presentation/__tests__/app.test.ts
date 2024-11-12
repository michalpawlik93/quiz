import { app } from "../../__fixtures__/fastifyFixture";

describe("Build Fastify App", () => {
  it("should connect to MongoDB and register services", async () => {
    expect(app.mongo).toBeDefined();
    expect(app.quizService).toBeDefined();
    expect(app.config).toBeDefined();
  });
});
