import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { QuizDto, quizDtoJsonSchema } from "../dto/quizDto";
import S from "fluent-json-schema";

export default async function quizRoutes(fastify: FastifyInstance) {
  fastify.get<{ Params: { id: string } }>(
    "/quiz/:id",
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
    "/quiz",
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

export const postSchema = {
  schema: {
    body: quizDtoJsonSchema,
    response: {
      201: messageResponseSchema,
      400: messageResponseSchema,
    },
  },
};

export const getSchema = {
  schema: {
    params: paramsSchema,
    response: {
      200: quizDtoJsonSchema,
      404: messageResponseSchema,
    },
  },
};
