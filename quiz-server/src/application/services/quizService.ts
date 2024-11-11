import { Quiz } from "../../domain/entities/quiz";
import { QuizDto, quizMapper } from "../../infrastructure/http/dto/quizDto";
import { IQuizRepository } from "../../infrastructure/repository/quizRepository";

export interface IQuizService {
  createQuiz: (dto: QuizDto) => Promise<void>;
  findQuizById: (id: string) => Promise<Quiz | null>;
}

export const QuizService = (quizRepo: IQuizRepository): IQuizService => {
  return {
    async createQuiz(dto: QuizDto) {
      const quiz = quizMapper(dto);
      quiz.validate();
      await quizRepo.createQuiz(quiz);
    },

    async findQuizById(id: string) {
      return await quizRepo.findQuizById(id);
    },
  };
};
