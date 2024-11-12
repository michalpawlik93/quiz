import { GenericContainer, StartedTestContainer } from "testcontainers";

let container: StartedTestContainer;

export const setupMongoContainer = async (): Promise<void> => {
  container = await new GenericContainer("mongo")
    .withExposedPorts(27017)
    .start();

  const mappedPort = container.getMappedPort(27017);
  const mongoUri = `mongodb://${container.getHost()}:${mappedPort}/quizapp`;

  process.env.DB_URI = mongoUri;
};

export const teardownMongoContainer = async (): Promise<void> => {
  if (container) await container.stop();
};

export { container };
