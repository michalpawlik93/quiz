import Fastify from "fastify";
import quizModule from "./moduls/quizModule";
import { QuizRepository } from "./repository/quizRepository";
import { QuizService, IQuizService } from "./services/quizService";
import { MongoClient, Db } from "mongodb";
import fastifyEnv from "@fastify/env";
import config, { ConfigType } from "./config/config";

declare module "fastify" {
  interface FastifyInstance {
    mongo: {
      client: MongoClient;
      db: Db;
    };
    quizService: IQuizService;
    config: ConfigType;
  }
}

export default async function build() {
  const fastify = Fastify({ logger: true });
  try {
    await fastify.register(fastifyEnv, config());

    if (!fastify.config) {
      throw new Error("fastify.config is still undefined");
    }

    await fastify.register(require("@fastify/mongodb"), {
      url: fastify.config.DB_URI,
    });

    const quizRepository = QuizRepository(fastify.mongo.db);
    fastify.decorate("quizService", QuizService(quizRepository));

    fastify.register(quizModule, {});
    await fastify.ready();
  } catch (error) {
    fastify.log.error("Error initializing application:", error);
    process.exit(1);
  }
  return fastify;
}
