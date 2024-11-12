import { Db, ObjectId } from "mongodb";
import { createQuizDaoId, QuizDao } from "../models/quizDao";
import { Quiz } from "../../domain/entities/quiz";

export interface IQuizRepository {
  createQuiz: (quiz: Quiz) => Promise<void>;
  findQuizById: (id: string) => Promise<Quiz | null>;
}

export const QuizRepository = (db: Db): IQuizRepository => {
  return {
    async createQuiz(quiz: Quiz): Promise<void> {
      const quizDao: QuizDao = {
        _id: createQuizDaoId(quiz.id),
        name: quiz.name,
        description: quiz.description,
        category: quiz.category,
      };
      await db.collection("quizzes").insertOne(quizDao);
    },

    async findQuizById(id: string): Promise<Quiz | null> {
      if (!ObjectId.isValid(id)) {
        throw new Error("Invalid ObjectId");
      }
      const result = await db
        .collection("quizzes")
        .findOne({ _id: new ObjectId(id) });
      if (!result) {
        return null;
      }
      const { _id, ...quiz } = result;
      return quiz as Quiz;
    },
  };
};
