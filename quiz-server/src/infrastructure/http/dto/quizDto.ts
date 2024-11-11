import { Quiz } from "../../../domain/entities/quiz";
import S from "fluent-json-schema";

export interface QuizDto {
  id: string;
  name: string;
  description: string;
  createdDate: Date;
  category: string;
}

export const quizMapper = (dto: QuizDto) =>
  new Quiz(dto.id, dto.name, dto.description, new Date(), dto.category);

export const quizDtoJsonSchema = S.object()
  .prop("id", S.string().raw({ nullable: true }))
  .prop("name", S.string().required())
  .prop("description", S.string().required())
  .prop("createdDate", S.string().format("date-time").required())
  .prop("category", S.string().required());
