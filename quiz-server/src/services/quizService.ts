import { IQuizRepository } from "../repository/quizRepository";
import { QuizDto } from "../dto/quizDto";
import { Quiz } from "../models/quiz";

export interface IQuizService {
  createQuiz: (dto: QuizDto) => Promise<void>;
  findQuizById: (id: string) => Promise<Quiz | null>;
}

export const QuizService = (quizRepo: IQuizRepository): IQuizService => {
  return {
    async createQuiz(dto: QuizDto) {
      const quiz = new Quiz(
        dto.id,
        dto.name,
        dto.description,
        new Date(),
        dto.category
      );

      if (quiz.validate()) {
        await quizRepo.createQuiz(quiz);
      } else {
        throw new Error("Invalid quiz data");
      }
    },

    async findQuizById(id: string) {
      return await quizRepo.findQuizById(id);
    },
  };
};
