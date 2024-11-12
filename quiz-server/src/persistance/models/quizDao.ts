import { ObjectId } from "mongodb";

export interface QuizDao {
  _id: ObjectId;
  name: string;
  description: string;
  category: string;
}

export const createQuizDaoId = (id: string) => new ObjectId(id);
