import { Quiz } from "../../domain/entities/quiz";
import { IQuizRepository } from "../../persistance/repositories/quizRepository";
import { QuizDto, quizMapper } from "../../presentation/dto/quizDto";

export interface IQuizService {
  createQuiz: (dto: QuizDto) => Promise<void>;
  findQuizById: (id: string) => Promise<Quiz | null>;
  getAll: () => Promise<Quiz[]>;
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
    async getAll() {
      return await quizRepo.getAll();
    },
  };
};
