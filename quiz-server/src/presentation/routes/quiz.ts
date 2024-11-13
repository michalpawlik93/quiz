import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import {
  QuizDto,
  quizDtoJsonSchema,
  quizDtoResponseJsonSchema,
  quizzesDtoResponseJsonSchema,
} from "../dto/quizDto";
import S from "fluent-json-schema";

export default async function quizRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/quizzes",
    getAllSchema,
    async (_request: FastifyRequest, reply: FastifyReply) => {
      const quiz = await fastify.quizService.getAll();
      return reply.send(quiz);
    }
  );
  fastify.get<{ Params: { id: string } }>(
    "/quizzes/:id",
    getSchema,
    async (
      request: FastifyRequest<{ Params: { id: string } }>,
      reply: FastifyReply
    ) => {
      const { id } = request.params;
      const quiz = await fastify.quizService.findQuizById(id);
      if (!quiz) {
        return reply.status(404).send({ message: "Quiz not found" });
      }
      return reply.send(quiz);
    }
  );

  fastify.post<{ Body: QuizDto }>(
    "/quizzes",
    postSchema,
    async (request: FastifyRequest<{ Body: QuizDto }>, reply: FastifyReply) => {
      try {
        await fastify.quizService.createQuiz(request.body);
        return reply.status(201).send({ message: "Quiz created" });
      } catch (error) {
        fastify.log.error(error);
        if (error instanceof Error) {
          return reply.status(400).send({ message: error.message });
        }
        return reply.status(400).send({ message: "An unknown error occurred" });
      }
    }
  );
}

const messageResponseSchema = S.object().prop("message", S.string()).required();
const paramsSchema = S.object().prop("id", S.string().required());

const postSchema = {
  schema: {
    body: quizDtoJsonSchema,
    response: {
      201: messageResponseSchema,
      400: messageResponseSchema,
    },
  },
};

const getSchema = {
  schema: {
    params: paramsSchema,
    response: {
      200: quizDtoResponseJsonSchema,
      404: messageResponseSchema,
    },
  },
};

const getAllSchema = {
  schema: {
    response: {
      200: quizzesDtoResponseJsonSchema,
    },
  },
};
