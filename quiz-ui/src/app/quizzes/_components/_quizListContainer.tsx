"use server";

import { getAllQuizzes } from "@/data/quiz";
import { QuizList } from "./_quizList";

export default async function QuizListContiner() {
  await new Promise((resolve) => {
    setTimeout(resolve, 4000);
  });
  const quizes = await getAllQuizzes();

  return <QuizList quizes={quizes} />;
}
