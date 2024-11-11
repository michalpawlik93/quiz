import Fastify from "fastify";
import { MongoClient, Db } from "mongodb";
import fastifyEnv from "@fastify/env";
import {
  IQuizService,
  QuizService,
} from "../../application/services/quizService";
import config, { ConfigType } from "./config/config";
import { QuizRepository } from "../repository/quizRepository";
import quizRoutes from "./routes/quiz";

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

    await fastify.register(require("@fastify/mongodb"), {
      url: fastify.config.DB_URI,
    });

    const quizRepository = QuizRepository(fastify.mongo.db);
    fastify.decorate("quizService", QuizService(quizRepository));

    fastify.register(quizRoutes, {});
    await fastify.ready();
  } catch (error) {
    fastify.log.error("Error initializing application:", error);
    process.exit(1);
  }
  return fastify;
}
