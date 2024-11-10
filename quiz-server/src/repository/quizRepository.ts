import { Quiz } from "../models/quiz";
import { Db, ObjectId } from "mongodb";

export interface IQuizRepository {
  createQuiz: (quiz: Quiz) => Promise<void>;
  findQuizById: (id: string) => Promise<Quiz | null>;
}

export const QuizRepository = (db: Db): IQuizRepository => {
  return {
    async createQuiz(quiz: Quiz): Promise<void> {
      await db.collection("quizzes").insertOne(quiz);
    },

    async findQuizById(id: string): Promise<Quiz | null> {
      if (!ObjectId.isValid(id)) {
        throw new Error("Invalid ObjectId format");
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
