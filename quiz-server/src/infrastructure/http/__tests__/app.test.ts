import { GenericContainer } from "testcontainers";
import build from "../app";
import { FastifyInstance } from "fastify";

describe("Build Fastify App", () => {
  let container: any;
  let app: FastifyInstance;

  beforeAll(async () => {
    container = await new GenericContainer("mongo")
      .withExposedPorts(27017)
      .start();

    const mappedPort = container.getMappedPort(27017);
    const mongoUri = `mongodb://${container.getHost()}:${mappedPort}`;

    process.env.DB_URI = mongoUri;

    app = await build();
  });

  afterAll(async () => {
    await app.close();
    await container.stop();
  });

  it("should connect to MongoDB and register services", async () => {
    expect(app.mongo).toBeDefined();
    expect(app.quizService).toBeDefined();
    expect(app.config).toBeDefined();
  });
});
