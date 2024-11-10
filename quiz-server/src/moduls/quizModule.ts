import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { QuizDto } from "../dto/quizDto";

export default async function quizModule(fastify: FastifyInstance) {
  fastify.get<{ Params: { id: string } }>(
    "/quiz/:id",
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
    async (request: FastifyRequest<{ Body: QuizDto }>, reply: FastifyReply) => {
      const quizDto = request.body;
      try {
        await fastify.quizService.createQuiz(quizDto);
        return reply.status(201).send({ message: "Quiz created" });
      } catch (error) {
        if (error instanceof Error) {
          fastify.log.error(error);
          return reply.status(400).send({ message: error.message });
        }
        return reply.status(400).send({ message: "An unknown error occurred" });
      }
    }
  );
}
