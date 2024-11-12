import {
  setupFastify,
  teardownFastify,
} from "./src/__fixtures__/fastifyFixture";
import {
  setupMongoContainer,
  teardownMongoContainer,
} from "./src/__fixtures__/mongoFixture";

beforeAll(async () => {
  await setupMongoContainer();
  await setupFastify();
});

afterAll(async () => {
  await teardownMongoContainer();
  await teardownFastify();
});
