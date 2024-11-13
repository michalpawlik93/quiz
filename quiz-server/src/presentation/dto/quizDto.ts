import S from "fluent-json-schema";
import { Quiz } from "../../domain/entities/quiz";

export interface QuizDto {
  id: string;
  name: string;
  description: string;
  category: string;
}

export const quizMapper = (dto: QuizDto) =>
  new Quiz(dto.id, dto.name, dto.description, dto.category);

export const quizDtoJsonSchema = S.object()
  .prop("id", S.string().raw({ nullable: true }))
  .prop("name", S.string().required())
  .prop("description", S.string().required())
  .prop("category", S.string().required());

export const quizDtoResponseJsonSchema = S.object()
  .prop("id", S.string().raw({ nullable: true }))
  .prop("name", S.string())
  .prop("description", S.string())
  .prop("category", S.string());

export const quizzesDtoResponseJsonSchema = S.array().items(
  quizDtoResponseJsonSchema
);
